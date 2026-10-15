"""Конфигурация приложения.

Все параметры читаются из переменных окружения и/или `.env` файла.
Путь к env-файлу ищется относительно корня проекта, поэтому запуск
не зависит от текущей рабочей директории.
"""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic import BaseModel, Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
from yarl import URL

# src/core/settings.py -> src/core -> src -> backend
BACKEND_ROOT = Path(__file__).resolve().parents[2]

ENV_DEVELOPMENT = BACKEND_ROOT / "dev.env"
ENV_LOCAL = BACKEND_ROOT / ".env"
ENV_EXAMPLE = BACKEND_ROOT / ".env.example"

# Заведомо небезопасный ключ: используется только как dev-значение
# и отвергается валидатором при ENVIRONMENT=prod.
DEV_SECRET_KEY = "dev-secret-key-change-me-in-production"  # noqa: S105


class APIPrefix:
    """Префиксы маршрутов API."""

    prefix: str = "/api"
    v1: str = "/v1"
    products: str = "/products"
    categories: str = "/categories"
    users: str = "/users"


class AuthSettings(BaseModel):
    """Настройки аутентификации."""

    secret_key: SecretStr = SecretStr(DEV_SECRET_KEY)
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24
    refresh_token_expire_days: int = 30


class DBSettings(BaseModel):
    """Настройки подключения к базе данных."""

    host: str = "localhost"
    port: int = 5432
    user: str = "user"
    password: SecretStr = SecretStr("password")
    database: str = "shop"
    pool_size: int = 15
    max_overflow: int = 10
    pool_timeout: int = 30
    echo: bool = False

    naming_convention: dict[str, str] = {
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }

    @property
    def url(self) -> URL:
        """Строка подключения к БД."""
        return URL.build(
            scheme="postgresql+asyncpg",
            user=self.user,
            password=self.password.get_secret_value(),
            host=self.host,
            port=self.port,
            path=f"/{self.database}",
        )


class Settings(BaseSettings):
    """Корневые настройки приложения."""

    app_name: str = "Dressly"
    environment: Literal["dev", "prod"] = "dev"
    debug: bool = False
    host: str = "127.0.0.1"
    port: int = 8000
    log_level: str = "INFO"
    reload: bool = False

    # Допустимые источники CORS. Для локальной разработки Next.js.
    cors_origins: list[str] = Field(default=["http://localhost:3000"])

    db: DBSettings = DBSettings()
    auth: AuthSettings = AuthSettings()
    api: APIPrefix = APIPrefix()

    model_config = SettingsConfigDict(
        env_file=(ENV_LOCAL, ENV_EXAMPLE, ENV_DEVELOPMENT),
        env_file_encoding="utf-8",
        case_sensitive=False,
        env_nested_delimiter="__",
        extra="ignore",
    )

    @property
    def is_prod(self) -> bool:
        return self.environment == "prod"

    def validate_runtime(self) -> None:
        """Проверяет настройки, опасные для production."""
        if not self.is_prod:
            return

        secret = self.auth.secret_key.get_secret_value()
        problems: list[str] = []

        if len(secret) < 32:
            problems.append(
                "AUTH__SECRET_KEY короче 32 символов",
            )
        if secret == DEV_SECRET_KEY:
            problems.append("AUTH__SECRET_KEY остался дефолтным")
        if self.reload:
            problems.append("RELOAD=true в production")
        if self.db.echo:
            problems.append("DB__ECHO=true в production")

        if problems:
            msg = "Некорректная конфигурация production: " + "; ".join(
                problems,
            )
            raise RuntimeError(msg)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
