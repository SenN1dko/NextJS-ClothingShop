from functools import lru_cache
from yarl import URL
from pydantic import BaseModel, SecretStr
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)

ENVFILE = "dev.env"


class DBSettings(BaseModel):
    host: str = "localhost"
    port: int = 5432
    user: str = "user"
    password: str = "password"
    database: str = "shop"
    pool_size: int = 15
    echo: bool = True

    naming_convention: dict[str, str] = {
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_`%(constraint_name)s`",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }

    @property
    def url(self) -> URL:
        return URL.build(
            user=self.user,
            password=str(self.password),
            host=self.host,
            port=self.port,
            scheme="postgresql+asyncpg",
            path=f"/{self.database}",
        )


class Settings(BaseSettings):
    app_name: str = "FastAPI SHOP"
    host: str = "0.0.0.0"
    port: int = 8000
    log_level: str = "info"
    reload: bool = True

    model_config = SettingsConfigDict(
        env_file=ENVFILE,
        case_sensitive=False,
        env_nested_delimiter="__",
        extra="ignore",
    )
    db: DBSettings = DBSettings()


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()

print(settings.model_dump())
