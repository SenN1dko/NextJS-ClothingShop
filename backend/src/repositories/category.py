"""Репозиторий категорий."""

from sqlalchemy import func, select

from models.category import Category
from models.product import Product
from repositories.base import BaseRepository


class CategoryRepository(BaseRepository[Category]):
    """Доступ к таблице `category`."""

    model = Category

    async def list_with_counts(self) -> list[tuple[Category, int]]:
        """Возвращает категории вместе с количеством товаров."""
        stmt = (
            select(Category, func.count(Product.id))
            .outerjoin(Product, Product.category_id == Category.id)
            .group_by(Category.id)
            .order_by(Category.name)
        )
        result = await self.session.execute(stmt)
        rows = result.all()
        return [(row[0], int(row[1])) for row in rows]

    async def get_by_slug(self, slug: str) -> Category | None:
        result = await self.session.execute(
            select(Category).where(Category.slug == slug),
        )
        return result.scalar_one_or_none()

    async def exists_slug(self, slug: str) -> bool:
        result = await self.session.execute(
            select(Category.id).where(Category.slug == slug).limit(1),
        )
        return result.scalar_one_or_none() is not None

    async def count_products(self, category_id: int) -> int:
        result = await self.session.execute(
            select(func.count(Product.id)).where(
                Product.category_id == category_id,
            ),
        )
        return int(result.scalar_one())
