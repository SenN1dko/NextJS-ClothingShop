"""Схемы пользователя и аутентификации."""

from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
)


class UserRegister(BaseModel):
    """Регистрация нового пользователя."""

    username: str = Field(
        min_length=3,
        max_length=32,
        pattern=r"^[a-zA-Z0-9_]+$",
    )
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    full_name: str | None = Field(default=None, max_length=128)

    @field_validator("password")
    @classmethod
    def _password_strength(cls, value: str) -> str:
        if not any(c.isalpha() for c in value):
            msg = "Пароль должен содержать буквы"
            raise ValueError(msg)
        if not any(c.isdigit() for c in value):
            msg = "Пароль должен содержать цифры"
            raise ValueError(msg)
        return value


class UserLogin(BaseModel):
    """Вход в систему."""

    username: str = Field(min_length=1, max_length=32)
    password: str = Field(min_length=1, max_length=128)


class UserRead(BaseModel):
    """Публичные данные пользователя."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: EmailStr
    full_name: str | None
    role: str
    is_active: bool
    created_at: datetime


class TokenPair(BaseModel):
    """Пара токенов."""

    access_token: str
    refresh_token: str
    token_type: str = Field(default="bearer")
    expires_in: int = Field(
        description="Время жизни access-токена в секундах",
    )


class TokenPayload(BaseModel):
    """Содержимое JWT."""

    sub: int
    type: str
    exp: int
    iat: int
