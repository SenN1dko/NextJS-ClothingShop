"""Базовый репозиторий с общими CRUD-операциями."""

from typing import Any

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from core.db.base import Base


class BaseRepository[ModelT: Base]:
    """Типизированный доступ к таблице."""

    model: type[ModelT]

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get(self, entity_id: int) -> ModelT | None:
        return await self.session.get(self.model, entity_id)

    async def list(
        self,
        *,
        limit: int,
        offset: int,
        order_by: Any = None,
        where: Any = None,
    ) -> list[ModelT]:
        stmt = select(self.model)
        if where is not None:
            stmt = stmt.where(where)
        if order_by is not None:
            stmt = stmt.order_by(order_by)
        stmt = stmt.limit(limit).offset(offset)

        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def count(self, where: Any = None) -> int:
        stmt = select(func.count()).select_from(self.model)
        if where is not None:
            stmt = stmt.where(where)
        result = await self.session.execute(stmt)
        return int(result.scalar_one())

    async def create(self, **values: Any) -> ModelT:
        entity = self.model(**values)
        self.session.add(entity)
        await self.session.flush()
        await self.session.refresh(entity)
        return entity

    async def update(self, entity: ModelT, **values: Any) -> ModelT:
        for key, value in values.items():
            if value is not None:
                setattr(entity, key, value)
        await self.session.flush()
        return entity

    async def delete(self, entity: ModelT) -> None:
        await self.session.delete(entity)
        await self.session.flush()
