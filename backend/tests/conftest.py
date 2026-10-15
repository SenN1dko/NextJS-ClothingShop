"""Общие фикстуры тестов: тестовая БД и HTTP-клиент."""

from collections.abc import AsyncGenerator
from decimal import Decimal

import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from yarl import URL

from core.db.base import Base
from core.db.db_depends import get_db_session
from core.settings import settings
from main import app

# Тесты работают на обычном PostgreSQL, чтобы проверить ARRAY, ENUM
# и прочие типы, которые не поддерживает SQLite.
TEST_DB_NAME = f"{settings.db.database}_test"
TEST_DB_URL = str(settings.db.url).replace(
    settings.db.database,
    TEST_DB_NAME,
)

# Порядок не важен из-за CASCADE, но перечисляем явно для ясности.
# Имена берём из метаданных: `user` — зарезервированное слово в SQL.
TABLES_TO_TRUNCATE = ", ".join(
    f'"{table.name}"' for table in Base.metadata.sorted_tables
)


def _quote_identifier(name: str) -> str:
    """Экранирует имя объекта БД для использования в DDL."""
    if not name.replace("_", "").isalnum():
        msg = f"Недопустимое имя базы данных: {name}"
        raise ValueError(msg)
    return f'"{name}"'


async def _ensure_test_database() -> None:
    """Создаёт тестовую базу, если её ещё нет.

    Раньше базу нужно было создавать отдельным шагом в CI, который
    ломался вместе с окружением. Теперь это делает сам pytest —
    шаг одинаково работает локально и в CI.
    """
    admin_url = URL.build(
        scheme="postgresql+asyncpg",
        user=settings.db.user,
        password=settings.db.password.get_secret_value(),
        host=settings.db.host,
        port=settings.db.port,
        path="/postgres",
    )

    # CREATE DATABASE нельзя выполнять внутри транзакции.
    admin_engine = create_async_engine(
        str(admin_url),
        echo=False,
        isolation_level="AUTOCOMMIT",
    )

    try:
        async with admin_engine.connect() as conn:
            exists = await conn.scalar(
                text("SELECT 1 FROM pg_database WHERE datname = :name"),
                {"name": TEST_DB_NAME},
            )
            if not exists:
                await conn.execute(
                    text(f"CREATE DATABASE {_quote_identifier(TEST_DB_NAME)}"),
                )
    finally:
        await admin_engine.dispose()


@pytest_asyncio.fixture(scope="session", loop_scope="session")
async def engine() -> AsyncGenerator:
    """Движок уровня сессии: схема создаётся один раз на весь прогон."""
    await _ensure_test_database()

    test_engine = create_async_engine(
        TEST_DB_URL,
        echo=False,
    )

    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    yield test_engine

    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

    await test_engine.dispose()


@pytest_asyncio.fixture
async def session(engine) -> AsyncGenerator[AsyncSession, None]:
    """Сессия на тест. Таблицы очищаются после каждого теста.

    Очистка вместо отката транзакции нужна потому, что обработчики
    API сами коммитят сессию — откат верхнего уровня не помог бы.
    """
    factory = async_sessionmaker(
        engine,
        expire_on_commit=False,
        autoflush=False,
    )

    async with factory() as db_session:
        yield db_session

    async with engine.begin() as conn:
        await conn.execute(
            text(f"TRUNCATE {TABLES_TO_TRUNCATE} RESTART IDENTITY CASCADE"),
        )


@pytest_asyncio.fixture
async def client(session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
        yield session

    app.dependency_overrides[get_db_session] = override_get_db

    transport = ASGITransport(app=app)
    async with AsyncClient(
        transport=transport,
        base_url="http://test",
    ) as test_client:
        yield test_client

    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def category(session: AsyncSession):
    from models.category import Category

    cat = Category(name="Мужская одежда", slug="men")
    session.add(cat)
    await session.commit()
    await session.refresh(cat)
    return cat


@pytest_asyncio.fixture
async def product(session: AsyncSession, category):
    from models.product import Product

    item = Product(
        name="Худи Oversize",
        slug="hoodie-oversize",
        description="Мягкий худи свободного кроя",
        brand="Nike",
        price=Decimal("59.90"),
        discount_percent=10,
        image_url="https://images.unsplash.com/photo-1",
        sizes=["S", "M", "L"],
        colors=["Чёрный"],
        stock=10,
        category_id=category.id,
    )
    session.add(item)
    await session.commit()
    await session.refresh(item)
    return item


@pytest_asyncio.fixture
async def user_factory(session: AsyncSession):
    from core.security import hash_password
    from models.user import User

    async def create(
        username: str = "tester",
        email: str = "tester@example.com",
        password: str = "pass1234",
        role: str = "user",
    ) -> User:
        from models.user import UserRole

        account = User(
            username=username,
            email=email,
            hashed_password=hash_password(password),
            role=UserRole(role),
        )
        session.add(account)
        await session.commit()
        await session.refresh(account)
        return account

    return create


@pytest_asyncio.fixture
async def auth_client(
    client: AsyncClient,
    user_factory,
) -> AsyncClient:
    """Клиент с токеном обычного пользователя."""
    account = await user_factory()

    response = await client.post(
        "/api/v1/users/login",
        json={"username": account.username, "password": "pass1234"},
    )
    tokens = response.json()

    client.headers["Authorization"] = f"Bearer {tokens['access_token']}"
    return client


@pytest_asyncio.fixture
async def admin_client(
    client: AsyncClient,
    user_factory,
) -> AsyncClient:
    """Клиент с токеном администратора (для CRUD-эндпоинтов)."""
    account = await user_factory(
        username="admin",
        email="admin@example.com",
        role="admin",
    )

    response = await client.post(
        "/api/v1/users/login",
        json={"username": account.username, "password": "pass1234"},
    )
    tokens = response.json()

    client.headers["Authorization"] = f"Bearer {tokens['access_token']}"
    return client
