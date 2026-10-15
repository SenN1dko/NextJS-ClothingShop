"""Наполнение БД демонстрационными данными.

Запуск:
    cd src && uv run python -m scripts.seed
"""

import asyncio
from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from core.security import hash_password
from core.settings import settings
from models import Cart, Category, Product, User, UserRole

CATEGORIES = [
    ("Мужская одежда", "men", "Рубашки, футболки, брюки и куртки"),
    ("Женская одежда", "women", "Платья, блузки, кардиганы"),
    ("Детская одежда", "kids", "Одежда для детей"),
    ("Аксессуары", "accessories", "Сумки, шарфы, головные уборы"),
]

PRODUCTS = [
    {
        "name": "Худи Oversize",
        "slug": "hoodie-oversize",
        "description": "Мягкий худи свободного кроя из хлопка с капюшоном.",
        "brand": "Nike",
        "price": Decimal("59.90"),
        "discount_percent": 10,
        "image_url": "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["Чёрный", "Серый"],
        "stock": 24,
        "category": "men",
    },
    {
        "name": "Классическая рубашка",
        "slug": "classic-shirt",
        "description": "Хлопковая рубашка прямого кроя.",
        "brand": "Zara",
        "price": Decimal("39.99"),
        "discount_percent": None,
        "image_url": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
        "sizes": ["S", "M", "L"],
        "colors": ["Белый", "Голубой"],
        "stock": 15,
        "category": "men",
    },
    {
        "name": "Платье миди",
        "slug": "midi-dress",
        "description": "Платье миди с V-образным вырезом.",
        "brand": "H&M",
        "price": Decimal("74.50"),
        "discount_percent": 20,
        "image_url": "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
        "sizes": ["XS", "S", "M"],
        "colors": ["Чёрный", "Красный"],
        "stock": 9,
        "category": "women",
    },
    {
        "name": "Джинсы прямого кроя",
        "slug": "straight-jeans",
        "description": "Джинсы средней посадки из плотного денимa.",
        "brand": "Levis",
        "price": Decimal("89.00"),
        "discount_percent": None,
        "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d",
        "sizes": ["28", "30", "32", "34"],
        "colors": ["Синий"],
        "stock": 30,
        "category": "women",
    },
    {
        "name": "Детская футболка",
        "slug": "kids-tee",
        "description": "Хлопковая футболка с принтом.",
        "brand": "Next",
        "price": Decimal("14.99"),
        "discount_percent": None,
        "image_url": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
        "sizes": ["2Y", "4Y", "6Y", "8Y"],
        "colors": ["Жёлтый", "Голубой"],
        "stock": 50,
        "category": "kids",
    },
    {
        "name": "Кожаная сумка",
        "slug": "leather-bag",
        "description": "Сумка из натуральной кожи с ремнём через плечо.",
        "brand": "Coach",
        "price": Decimal("199.00"),
        "discount_percent": 15,
        "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        "sizes": [],
        "colors": ["Коричневый", "Чёрный"],
        "stock": 7,
        "category": "accessories",
    },
]

ADMIN = {
    "username": "admin",
    "email": "admin@dressly.ru",
    "password": "admin12345",
    "role": UserRole.ADMIN,
}

CUSTOMER = {
    "username": "demo",
    "email": "demo@dressly.ru",
    "password": "demo12345",
    "role": UserRole.USER,
}


async def seed() -> None:
    engine = create_async_engine(str(settings.db.url), echo=False)
    factory = async_sessionmaker(engine, expire_on_commit=False)

    async with factory() as session:
        existing = await session.execute(select(Product.id).limit(1))
        if existing.scalar_one_or_none() is not None:
            print("БД уже заполнена, пропускаем.")
            return

        categories: dict[str, Category] = {}
        for name, slug, description in CATEGORIES:
            category = Category(
                name=name,
                slug=slug,
                description=description,
            )
            session.add(category)
            categories[slug] = category

        # Проставляем id категорий до создания товаров.
        await session.flush()

        for data in PRODUCTS:
            session.add(
                Product(
                    name=data["name"],
                    slug=data["slug"],
                    description=data["description"],
                    brand=data["brand"],
                    price=data["price"],
                    discount_percent=data["discount_percent"],
                    image_url=data["image_url"],
                    sizes=list(data["sizes"]),
                    colors=list(data["colors"]),
                    stock=data["stock"],
                    category_id=categories[data["category"]].id,
                ),
            )

        users: list[User] = []
        for account in (ADMIN, CUSTOMER):
            user = User(
                username=account["username"],
                email=account["email"],
                hashed_password=hash_password(account["password"]),
                role=account["role"],
            )
            session.add(user)
            users.append(user)

        await session.flush()
        session.add(Cart(user_id=users[1].id))

        await session.commit()

    await engine.dispose()
    print(f"Добавлено {len(PRODUCTS)} товаров и {len(CATEGORIES)} категорий.")
    print("Учётные записи: admin/admin12345, demo/demo12345")


if __name__ == "__main__":
    asyncio.run(seed())
