"""Эндпоинты корзины. Доступны только авторизованным пользователям."""

from fastapi import APIRouter, status

from api.dependencies import CartServiceDep, CurrentUser
from schemas.cart import (
    CartItemCreate,
    CartItemUpdate,
    CartRead,
)

router = APIRouter(prefix="/cart", tags=["cart"])


@router.get(
    "",
    response_model=CartRead,
    summary="Корзина текущего пользователя",
)
async def get_cart(
    service: CartServiceDep,
    current_user: CurrentUser,
) -> CartRead:
    cart = await service.get_cart(current_user.id)
    return CartRead.from_model(cart)


@router.post(
    "/items",
    response_model=CartRead,
    status_code=status.HTTP_201_CREATED,
    summary="Добавить товар в корзину",
)
async def add_item(
    payload: CartItemCreate,
    service: CartServiceDep,
    current_user: CurrentUser,
) -> CartRead:
    cart = await service.add_item(current_user.id, payload)
    return CartRead.from_model(cart)


@router.patch(
    "/items/{item_id}",
    response_model=CartRead,
    summary="Изменить количество позиции",
)
async def update_item(
    item_id: int,
    payload: CartItemUpdate,
    service: CartServiceDep,
    current_user: CurrentUser,
) -> CartRead:
    cart = await service.update_item(current_user.id, item_id, payload)
    return CartRead.from_model(cart)


@router.delete(
    "/items/{item_id}",
    response_model=CartRead,
    summary="Удалить позицию из корзины",
)
async def remove_item(
    item_id: int,
    service: CartServiceDep,
    current_user: CurrentUser,
) -> CartRead:
    cart = await service.remove_item(current_user.id, item_id)
    return CartRead.from_model(cart)


@router.delete(
    "",
    response_model=CartRead,
    summary="Очистить корзину",
)
async def clear_cart(
    service: CartServiceDep,
    current_user: CurrentUser,
) -> CartRead:
    cart = await service.clear(current_user.id)
    return CartRead.from_model(cart)
