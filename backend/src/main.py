import uvicorn
from typing import AsyncGenerator
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager

from core.settings import settings
from api import router as api_router
from core.db import db_lifetime


@asynccontextmanager
async def lifespan(
    app: FastAPI,
) -> AsyncGenerator[None, None]:
    await db_lifetime.setup_db(app)

    yield

    await db_lifetime.shutdown_db(app)


app = FastAPI(lifespan=lifespan)
app.include_router(api_router)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        reload=settings.reload,
        host=settings.host,
        port=settings.port,
        log_level=settings.log_level,
    )
