"""Бизнес-логика категорий."""

from typing import Any

from fastapi import HTTPException, status

from models.category import Category
from repositories.category import CategoryRepository
from schemas.category import CategoryCreate, CategoryUpdate


class CategoryService:
    """Сценарии работы с категориями."""

    def __init__(self, repo: CategoryRepository) -> None:
        self.repo = repo

    async def list_categories(self) -> list[tuple[Category, int]]:
        return await self.repo.list_with_counts()

    async def get_category(self, category_id: int) -> Category:
        category: Category | None = await self.repo.get(category_id)
        if category is None:
            msg = "Категория не найдена"
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=msg,
            )
        return category

    async def create_category(self, data: CategoryCreate) -> Category:
        slug: str = data.resolved_slug()
        if await self.repo.exists_slug(slug):
            msg = f"Категория со slug '{slug}' уже существует"
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=msg,
            )
        return await self.repo.create(
            name=data.name,
            slug=slug,
            description=data.description,
        )

    async def update_category(
        self,
        category_id: int,
        data: CategoryUpdate,
    ) -> Category:
        category: Category = await self.get_category(category_id)
        values: dict[str, Any] = data.model_dump(exclude_unset=True)

        new_slug: Any = values.get("slug")
        slug_conflicts: bool = bool(
            new_slug
            and new_slug != category.slug
            and await self.repo.exists_slug(new_slug),
        )
        if slug_conflicts:
            msg = f"Категория со slug '{new_slug}' уже существует"
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=msg,
            )

        return await self.repo.update(category, **values)

    async def delete_category(self, category_id: int) -> None:
        category: Category = await self.get_category(category_id)

        products_count: int = await self.repo.count_products(category_id)
        if products_count:
            msg = (
                f"Нельзя удалить категорию с товарами. Товаров в ней: {products_count}"
            )
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=msg,
            )

        await self.repo.delete(category)
