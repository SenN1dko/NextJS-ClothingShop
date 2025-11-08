from sqlalchemy.ext.asyncio import (
    async_sessionmaker,
    create_async_engine,
)
from fastapi import FastAPI

from core.settings import settings


async def setup_db(app: FastAPI) -> None:
    engine = create_async_engine(
        url=str(settings.db.url),
        echo=settings.db.echo,
    )
    session_factory = async_sessionmaker(
        engine,
        expire_on_commit=False,
    )

    app.state.db_engine = engine
    app.state.db_session_factory = session_factory
    await engine.dispose()


async def shutdown_db(app: FastAPI) -> None:
    await app.state.db_engine.dispose()
