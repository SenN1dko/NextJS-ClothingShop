"""Эндпоинты товаров."""

from decimal import Decimal
from typing import Annotated, Any, Literal

from fastapi import APIRouter, Query, status

from api.dependencies import AdminUser, ProductServiceDep
from models.product import Product
from schemas.common import MessageResponse, PageMeta, PaginatedResponse
from schemas.product import (
    CategoryBrief,
    ProductCreate,
    ProductRead,
    ProductUpdate,
)
from services.product_service import calculate_final_price

router = APIRouter(prefix="/products", tags=["products"])

SortOption = Literal[
    "newest",
    "price_asc",
    "price_desc",
    "name",
    "popular",
]

MAX_LIMIT = 100


def to_read_model(product: Product) -> ProductRead:
    """Конвертирует ORM-объект в схему ответа."""
    category: CategoryBrief | None = None
    if product.category is not None:
        category = CategoryBrief.model_validate(product.category)

    return ProductRead(
        id=product.id,
        name=product.name,
        slug=product.slug,
        description=product.description,
        brand=product.brand,
        price=product.price,
        discount_percent=product.discount_percent,
        final_price=calculate_final_price(product),
        image_url=product.image_url,
        images=list(product.images or []),
        sizes=list(product.sizes or []),
        colors=list(product.colors or []),
        stock=product.stock,
        is_active=product.is_active,
        category_id=product.category_id,
        category=category,
        created_at=product.created_at,
        updated_at=product.updated_at,
    )


@router.get(
    "",
    response_model=PaginatedResponse[ProductRead],
    summary="Список товаров с фильтрами и пагинацией",
)
async def list_products(
    service: ProductServiceDep,
    limit: Annotated[int, Query(ge=1, le=MAX_LIMIT)] = 20,
    offset: Annotated[int, Query(ge=0)] = 0,
    search: Annotated[str | None, Query(max_length=100)] = None,
    category: Annotated[str | None, Query(max_length=64)] = None,
    min_price: Annotated[Decimal | None, Query(ge=0)] = None,
    max_price: Annotated[Decimal | None, Query(ge=0)] = None,
    in_stock: bool = False,
    sort: SortOption = "newest",
) -> PaginatedResponse[ProductRead]:
    filters: dict[str, Any] = {
        "search": search,
        "category_slug": category,
        "min_price": min_price,
        "max_price": max_price,
        "in_stock": in_stock,
        "sort": sort,
    }

    products, total = await service.list_products(
        limit=limit,
        offset=offset,
        **filters,
    )

    return PaginatedResponse[ProductRead](
        items=[to_read_model(p) for p in products],
        meta=PageMeta(
            total=total,
            limit=limit,
            offset=offset,
            has_more=offset + len(products) < total,
        ),
    )


@router.get(
    "/{product_id}",
    response_model=ProductRead,
    summary="Товар по идентификатору",
)
async def get_product(
    product_id: int,
    service: ProductServiceDep,
) -> ProductRead:
    product = await service.get_product(product_id)
    return to_read_model(product)


@router.post(
    "",
    response_model=ProductRead,
    status_code=status.HTTP_201_CREATED,
    summary="Создать товар",
)
async def create_product(
    payload: ProductCreate,
    service: ProductServiceDep,
    _admin: AdminUser,
) -> ProductRead:
    product = await service.create_product(payload)
    return to_read_model(product)


@router.patch(
    "/{product_id}",
    response_model=ProductRead,
    summary="Обновить товар",
)
async def update_product(
    product_id: int,
    payload: ProductUpdate,
    service: ProductServiceDep,
    _admin: AdminUser,
) -> ProductRead:
    product = await service.update_product(product_id, payload)
    return to_read_model(product)


@router.delete(
    "/{product_id}",
    response_model=MessageResponse,
    summary="Удалить товар",
)
async def delete_product(
    product_id: int,
    service: ProductServiceDep,
    _admin: AdminUser,
) -> MessageResponse:
    await service.delete_product(product_id)
    return MessageResponse(message="Товар удалён")
