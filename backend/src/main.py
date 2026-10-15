"""Точка входа FastAPI-приложения."""

import logging
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from api import router as api_router
from core.db import db_lifetime
from core.settings import settings

logger = logging.getLogger(__name__)


def configure_logging() -> None:
    """Настраивает базовое логирование."""
    logging.basicConfig(
        level=settings.log_level.upper(),
        format="%(asctime)s %(levelname)-8s %(name)s: %(message)s",
    )


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    settings.validate_runtime()
    configure_logging()
    await db_lifetime.setup_db(app)
    logger.info("Приложение запущено")
    try:
        yield
    finally:
        await db_lifetime.shutdown_db(app)
        logger.info("Приложение остановлено")


def create_app() -> FastAPI:
    """Собирает приложение. Фабрика упрощает тестирование."""
    docs_url: str | None = None if settings.is_prod else "/docs"
    openapi_url: str | None = None if settings.is_prod else "/openapi.json"

    app = FastAPI(
        title=settings.app_name,
        version="1.0.0",
        description=(
            "API интернет-магазина одежды Dressly: "
            "товары, категории, корзина и авторизация."
        ),
        lifespan=lifespan,
        docs_url=docs_url,
        redoc_url=None if settings.is_prod else "/redoc",
        openapi_url=openapi_url,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type", "X-Refresh-Token"],
    )

    app.include_router(api_router)

    @app.get("/health", tags=["system"])
    async def health() -> dict[str, str]:
        """Проверка живости приложения."""
        return {"status": "ok"}

    @app.exception_handler(Exception)
    async def unhandled_exception(
        request: Request,
        exc: Exception,
    ) -> JSONResponse:
        logger.exception("Необработанная ошибка на %s", request.url.path)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Внутренняя ошибка сервера"},
        )

    return app


app = create_app()


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        reload=settings.reload,
        host=settings.host,
        port=settings.port,
        log_level=settings.log_level.lower(),
    )
