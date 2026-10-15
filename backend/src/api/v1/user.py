"""Эндпоинты аутентификации и текущего пользователя."""

from typing import Annotated

from fastapi import APIRouter, Header, HTTPException, status

from api.dependencies import CurrentUser, UserServiceDep
from core.security import decode_token
from models.user import User
from schemas.user import (
    TokenPair,
    UserLogin,
    UserRead,
    UserRegister,
)

router = APIRouter(prefix="/users", tags=["users"])


@router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
    summary="Регистрация",
)
async def register(
    payload: UserRegister,
    service: UserServiceDep,
) -> UserRead:
    user: User = await service.register(payload)
    return UserRead.model_validate(user)


@router.post(
    "/login",
    response_model=TokenPair,
    summary="Вход и получение токенов",
)
async def login(
    payload: UserLogin,
    service: UserServiceDep,
) -> TokenPair:
    return await service.login(payload)


@router.post(
    "/refresh",
    response_model=TokenPair,
    summary="Обновить токены по refresh-токену",
)
async def refresh(
    service: UserServiceDep,
    refresh_token: Annotated[
        str | None,
        Header(alias="X-Refresh-Token"),
    ] = None,
) -> TokenPair:
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Требуется валидный refresh-токен",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not refresh_token:
        raise unauthorized

    user_id: int | None = decode_token(
        refresh_token,
        expected_type="refresh",
    )
    if user_id is None:
        raise unauthorized

    return service.refresh(user_id)


@router.get(
    "/me",
    response_model=UserRead,
    summary="Текущий пользователь",
)
async def get_me(current_user: CurrentUser) -> UserRead:
    return UserRead.model_validate(current_user)
