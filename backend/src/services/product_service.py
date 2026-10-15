"""Бизнес-логика товаров."""

from decimal import ROUND_HALF_UP, Decimal
from typing import Any

from fastapi import HTTPException, status

from models.product import Product
from repositories.category import CategoryRepository
from repositories.product import ProductRepository
from schemas.product import ProductCreate, ProductUpdate

TWO_PLACES = Decimal("0.01")


def calculate_final_price(product: Product) -> Decimal:
    """Возвращает цену с учётом процентной скидки."""
    price: Decimal = Decimal(product.price)
    percent: int | None = product.discount_percent

    if not percent:
        return price.quantize(TWO_PLACES, rounding=ROUND_HALF_UP)

    factor: Decimal = Decimal(100 - percent) / Decimal(100)
    return (price * factor).quantize(
        TWO_PLACES,
        rounding=ROUND_HALF_UP,
    )


class ProductService:
    """Сценарии работы с товарами."""

    def __init__(
        self,
        product_repo: ProductRepository,
        category_repo: CategoryRepository,
    ) -> None:
        self.product_repo = product_repo
        self.category_repo = category_repo

    async def list_products(
        self,
        *,
        limit: int,
        offset: int,
        **filters: Any,
    ) -> tuple[list[Product], int]:
        # `sort` влияет только на порядок, поэтому не участвует
        # в подсчёте общего количества.
        count_filters = {k: v for k, v in filters.items() if k != "sort"}

        items: list[Product] = await self.product_repo.list_paginated(
            limit=limit,
            offset=offset,
            **filters,
        )
        total: int = await self.product_repo.count_filtered(**count_filters)
        return items, total

    async def get_product(self, product_id: int) -> Product:
        product: Product | None = await self.product_repo.get_with_category(product_id)
        if product is None:
            msg = "Товар не найден"
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=msg,
            )
        return product

    async def create_product(self, data: ProductCreate) -> Product:
        await self._ensure_category_exists(data.category_id)

        slug: str = data.resolved_slug()
        if await self.product_repo.exists_slug(slug):
            slug = await self._unique_slug(slug)

        product: Product = await self.product_repo.create(
            name=data.name,
            slug=slug,
            description=data.description,
            brand=data.brand,
            price=data.price,
            discount_percent=data.discount_percent,
            image_url=data.image_url,
            images=list(data.images),
            sizes=list(data.sizes),
            colors=list(data.colors),
            stock=data.stock,
            category_id=data.category_id,
        )
        # Категория не была подгружена — делаем это явно.
        loaded = await self.product_repo.get_with_category(product.id)
        return loaded or product

    async def update_product(
        self,
        product_id: int,
        data: ProductUpdate,
    ) -> Product:
        product: Product = await self.get_product(product_id)

        values: dict[str, Any] = data.model_dump(
            exclude_unset=True,
            exclude_none=True,
        )

        if "category_id" in values:
            await self._ensure_category_exists(values["category_id"])

        for field in ("images", "sizes", "colors"):
            if field in values:
                values[field] = list(values[field])

        product = await self.product_repo.update(product, **values)
        loaded = await self.product_repo.get_with_category(product.id)
        return loaded or product

    async def delete_product(self, product_id: int) -> None:
        product: Product = await self.get_product(product_id)
        await self.product_repo.delete(product)

    async def _ensure_category_exists(self, category_id: int) -> None:
        category = await self.category_repo.get(category_id)
        if category is None:
            msg = f"Категория {category_id} не найдена"
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=msg,
            )

    async def _unique_slug(self, base: str) -> str:
        """Добавляет числовой суффикс, пока slug не станет свободным."""
        suffix: int = 2
        candidate: str = f"{base}-{suffix}"

        while await self.product_repo.exists_slug(candidate):
            suffix += 1
            candidate = f"{base}-{suffix}"

        return candidate
