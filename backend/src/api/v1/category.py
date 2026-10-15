"""Эндпоинты категорий."""

from fastapi import APIRouter, status

from api.dependencies import AdminUser, CategoryServiceDep
from models.category import Category
from schemas.category import (
    CategoryCreate,
    CategoryRead,
    CategoryUpdate,
)
from schemas.common import MessageResponse

router = APIRouter(prefix="/categories", tags=["categories"])


def to_read_model(
    category: Category,
    products_count: int,
) -> CategoryRead:
    return CategoryRead(
        id=category.id,
        name=category.name,
        slug=category.slug,
        description=category.description,
        products_count=products_count,
        created_at=category.created_at,
        updated_at=category.updated_at,
    )


@router.get(
    "",
    response_model=list[CategoryRead],
    summary="Список категорий",
)
async def list_categories(
    service: CategoryServiceDep,
) -> list[CategoryRead]:
    rows = await service.list_categories()
    return [to_read_model(cat, count) for cat, count in rows]


@router.get(
    "/{category_id}",
    response_model=CategoryRead,
    summary="Категория по идентификатору",
)
async def get_category(
    category_id: int,
    service: CategoryServiceDep,
) -> CategoryRead:

    category = await service.get_category(category_id)
    count: int = await service.repo.count_products(category_id)
    return to_read_model(category, count)


@router.post(
    "",
    response_model=CategoryRead,
    status_code=status.HTTP_201_CREATED,
    summary="Создать категорию",
)
async def create_category(
    payload: CategoryCreate,
    service: CategoryServiceDep,
    _admin: AdminUser,
) -> CategoryRead:
    category = await service.create_category(payload)
    return to_read_model(category, 0)


@router.patch(
    "/{category_id}",
    response_model=CategoryRead,
    summary="Обновить категорию",
)
async def update_category(
    category_id: int,
    payload: CategoryUpdate,
    service: CategoryServiceDep,
    _admin: AdminUser,
) -> CategoryRead:
    category = await service.update_category(category_id, payload)
    count: int = await service.repo.count_products(category_id)
    return to_read_model(category, count)


@router.delete(
    "/{category_id}",
    response_model=MessageResponse,
    summary="Удалить категорию",
)
async def delete_category(
    category_id: int,
    service: CategoryServiceDep,
    _admin: AdminUser,
) -> MessageResponse:
    await service.delete_category(category_id)
    return MessageResponse(message="Категория удалена")
