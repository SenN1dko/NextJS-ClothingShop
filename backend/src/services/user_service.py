"""Бизнес-логика пользователей и аутентификации."""

from fastapi import HTTPException, status

from core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from core.settings import settings
from models.user import User
from repositories.user import UserRepository
from schemas.user import TokenPair, UserLogin, UserRegister


class UserService:
    """Сценарии регистрации и входа."""

    def __init__(self, repo: UserRepository) -> None:
        self.repo = repo

    async def register(self, data: UserRegister) -> User:
        exists: bool = await self.repo.exists_username_or_email(
            data.username,
            data.email,
        )
        if exists:
            msg = "Пользователь с таким логином или e-mail уже существует"
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=msg,
            )

        return await self.repo.create(
            username=data.username,
            email=data.email,
            hashed_password=hash_password(data.password),
            full_name=data.full_name,
        )

    async def login(self, data: UserLogin) -> TokenPair:
        user: User | None = await self.repo.get_by_username(
            data.username,
        )

        # Одинаковый ответ для «нет пользователя» и «неверный пароль»,
        # чтобы нельзя было перебором выяснить существующие логины.
        if user is None or not verify_password(
            data.password,
            user.hashed_password,
        ):
            msg = "Неверный логин или пароль"
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=msg,
            )

        if not user.is_active:
            msg = "Аккаунт заблокирован"
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=msg,
            )

        return self._issue_tokens(user.id)

    def refresh(self, user_id: int) -> TokenPair:
        return self._issue_tokens(user_id)

    def _issue_tokens(self, user_id: int) -> TokenPair:
        return TokenPair(
            access_token=create_access_token(user_id),
            refresh_token=create_refresh_token(user_id),
            expires_in=settings.auth.access_token_expire_minutes * 60,
        )
