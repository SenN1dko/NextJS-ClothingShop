"""Жизненный цикл пула соединений с БД."""

from fastapi import FastAPI
from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    async_sessionmaker,
    create_async_engine,
)

from core.settings import settings


async def setup_db(app: FastAPI) -> None:
    """Создаёт engine и фабрику сессий, проверяет подключение."""
    engine = create_async_engine(
        url=str(settings.db.url),
        echo=settings.db.echo,
        pool_size=settings.db.pool_size,
        max_overflow=settings.db.max_overflow,
        pool_timeout=settings.db.pool_timeout,
        pool_pre_ping=True,
    )

    app.state.db_engine = engine
    app.state.db_session_factory = async_sessionmaker(
        engine,
        expire_on_commit=False,
        autoflush=False,
    )

    # Проверяем реальную связность с БД на старте, чтобы падать
    # сразу с понятной ошибкой, а не на первом же запросе.
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
    except Exception:
        await engine.dispose()
        raise


async def shutdown_db(app: FastAPI) -> None:
    """Закрывает пул соединений при остановке приложения."""
    engine = getattr(app.state, "db_engine", None)
    if engine is not None:
        await engine.dispose()
