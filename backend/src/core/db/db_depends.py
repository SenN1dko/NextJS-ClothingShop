"""Зависимость FastAPI для доступа к сессии БД."""

from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.requests import Request


async def get_db_session(
    request: Request,
) -> AsyncGenerator[AsyncSession, None]:
    """Выдаёт сессию БД с корректным управлением транзакцией.

    Коммит происходит только при штатном завершении обработчика.
    При любом исключении транзакция откатывается и сессия закрывается.
    """
    session_factory = request.app.state.db_session_factory
    session: AsyncSession = session_factory()

    try:
        yield session
        await session.commit()
    except Exception:
        await session.rollback()
        raise
    finally:
        await session.close()


GetDBSession = Annotated[AsyncSession, Depends(get_db_session)]
