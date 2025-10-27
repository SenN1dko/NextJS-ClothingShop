import uvicorn
from typing import AsyncGenerator
from fastapi import FastAPI

from contextlib import asynccontextmanager

from core.setting import settings
from routes import v1_router
from core.db import db_lifetime


@asynccontextmanager
async def lifespan(
    app: FastAPI,
) -> AsyncGenerator[None, None]:
    await db_lifetime.setup_db(app)

    yield

    await db_lifetime.shutdown_db(app)


app = FastAPI(lifespan=lifespan)
app.include_router(v1_router)


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        reload=settings.reload,
        host=settings.host,
        port=settings.port,
        log_level=settings.log_level,
    )
