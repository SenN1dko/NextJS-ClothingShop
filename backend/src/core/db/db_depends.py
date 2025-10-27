from typing import Annotated, AsyncGenerator
from fastapi import Depends
from sqlalchemy import exc as sa_exc
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.requests import Request


async def get_db_session(
    request: Request,
) -> AsyncGenerator[AsyncSession, None]:
    """Получаем сессию"""
    session: AsyncSession = (
        request.app.state.dp_session_factory()
    )

    try:
        yield session
    except sa_exc.DBAPIError:
        await session.rollback()
    finally:
        await session.commit()
        await session.close()


GetDBSession = Annotated[
    AsyncSession, Depends(get_db_session)
]
