from functools import lru_cache
from yarl import URL
from pydantic import BaseModel
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)

ENVFILE = "dev.env"


class DBSettings(BaseModel):
    host: str = "postgress"
    port: int = 5432
    user: str = "user"
    password: str = "password"
    database: str = "shop"
    pool_size: int = 15
    echo: bool = True

    @property
    def url(self) -> URL:
        return URL.build(
            user=self.user,
            password=self.password,
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
    )
    db: DBSettings = DBSettings()


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()

print(settings.db.url)
