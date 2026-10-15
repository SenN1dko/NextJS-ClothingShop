"""Репозиторий товаров."""

from decimal import Decimal
from typing import Any

from sqlalchemy import (
    Select,
    asc,
    desc,
    func,
    or_,
    select,
)
from sqlalchemy.orm import selectinload

from models.category import Category
from models.product import Product
from repositories.base import BaseRepository


class ProductRepository(BaseRepository[Product]):
    """Доступ к таблице `product`."""

    model = Product

    def _base_query(self) -> Select[Any]:
        return select(Product).options(selectinload(Product.category))

    async def get_with_category(
        self,
        product_id: int,
    ) -> Product | None:
        result = await self.session.execute(
            self._base_query().where(Product.id == product_id),
        )
        return result.unique().scalar_one_or_none()

    async def get_by_slug(self, slug: str) -> Product | None:
        result = await self.session.execute(
            self._base_query().where(Product.slug == slug),
        )
        return result.unique().scalar_one_or_none()

    async def exists_slug(self, slug: str) -> bool:
        result = await self.session.execute(
            select(Product.id).where(Product.slug == slug).limit(1),
        )
        return result.scalar_one_or_none() is not None

    async def list_paginated(
        self,
        *,
        limit: int,
        offset: int,
        search: str | None = None,
        category_slug: str | None = None,
        min_price: Decimal | None = None,
        max_price: Decimal | None = None,
        in_stock: bool = False,
        sort: str = "newest",
    ) -> list[Product]:
        stmt = self._base_query()
        stmt = self._apply_filters(
            stmt,
            search=search,
            category_slug=category_slug,
            min_price=min_price,
            max_price=max_price,
            in_stock=in_stock,
        )
        stmt = self._apply_sort(stmt, sort)
        stmt = stmt.limit(limit).offset(offset)

        result = await self.session.execute(stmt)
        return list(result.unique().scalars().all())

    async def count_filtered(
        self,
        *,
        search: str | None = None,
        category_slug: str | None = None,
        min_price: Decimal | None = None,
        max_price: Decimal | None = None,
        in_stock: bool = False,
    ) -> int:
        stmt = select(func.count()).select_from(Product)
        stmt = self._apply_filters(
            stmt,
            search=search,
            category_slug=category_slug,
            min_price=min_price,
            max_price=max_price,
            in_stock=in_stock,
        )
        result = await self.session.execute(stmt)
        return int(result.scalar_one())

    def _apply_filters(
        self,
        stmt: Select[Any],
        *,
        search: str | None,
        category_slug: str | None,
        min_price: Decimal | None,
        max_price: Decimal | None,
        in_stock: bool,
    ) -> Select[Any]:
        """Навешивает WHERE-условия.

        Фильтр по категории всегда требует JOIN: без него получилось бы
        декартово произведение таблиц product и category.
        """
        if search:
            pattern = f"%{search.lower()}%"
            stmt = stmt.where(
                or_(
                    func.lower(Product.name).like(pattern),
                    func.lower(Product.brand).like(pattern),
                    func.lower(Product.description).like(pattern),
                ),
            )

        if category_slug:
            stmt = stmt.join(Product.category)
            stmt = stmt.where(Category.slug == category_slug)

        if min_price is not None:
            stmt = stmt.where(Product.price >= min_price)
        if max_price is not None:
            stmt = stmt.where(Product.price <= max_price)
        if in_stock:
            stmt = stmt.where(Product.stock > 0)

        return stmt

    def _apply_sort(self, stmt: Select[Any], sort: str) -> Select[Any]:
        match sort:
            case "price_asc":
                return stmt.order_by(asc(Product.price))
            case "price_desc":
                return stmt.order_by(desc(Product.price))
            case "name":
                return stmt.order_by(asc(Product.name))
            case "popular":
                return stmt.order_by(desc(Product.stock), asc(Product.name))
            case _:
                return stmt.order_by(desc(Product.id))
