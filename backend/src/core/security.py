"""Хеширование паролей и работа с JWT."""

from datetime import UTC, datetime, timedelta
from typing import Any

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import (
    InvalidHashError,
    VerificationError,
    VerifyMismatchError,
)

from core.settings import settings

_hasher = PasswordHasher()


def hash_password(password: str) -> str:
    """Хеширует пароль алгоритмом argon2."""
    return _hasher.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    """Проверяет пароль против хеша."""
    try:
        _hasher.verify(hashed, password)
    except (VerifyMismatchError, VerificationError, InvalidHashError):
        return False
    return True


def _create_token(
    subject: int,
    token_type: str,
    expires_delta: timedelta,
) -> str:
    now = datetime.now(UTC)
    payload: dict[str, Any] = {
        "sub": str(subject),
        "type": token_type,
        "iat": now,
        "exp": now + expires_delta,
    }
    return jwt.encode(
        payload,
        settings.auth.secret_key.get_secret_value(),
        algorithm=settings.auth.algorithm,
    )


def create_access_token(subject: int) -> str:
    """Создаёт короткоживущий access-токен."""
    delta = timedelta(
        minutes=settings.auth.access_token_expire_minutes,
    )
    return _create_token(subject, "access", delta)


def create_refresh_token(subject: int) -> str:
    """Создаёт долгоживущий refresh-токен."""
    delta = timedelta(days=settings.auth.refresh_token_expire_days)
    return _create_token(subject, "refresh", delta)


def decode_token(token: str, expected_type: str) -> int | None:
    """Декодирует токен и возвращает subject, если тип совпадает."""
    try:
        payload: dict[str, Any] = jwt.decode(
            token,
            settings.auth.secret_key.get_secret_value(),
            algorithms=[settings.auth.algorithm],
        )
    except jwt.PyJWTError:
        return None

    if payload.get("type") != expected_type:
        return None

    subject: Any = payload.get("sub")
    if subject is None:
        return None

    try:
        return int(subject)
    except (TypeError, ValueError):
        return None
