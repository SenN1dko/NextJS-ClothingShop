"""Базовый декларативный класс для моделей SQLAlchemy."""

from datetime import datetime
from typing import Any

from sqlalchemy import DateTime, MetaData, func
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
)

from core.settings import settings


class Base(DeclarativeBase):
    """Общий базовый класс для всех ORM-моделей."""

    __abstract__ = True

    metadata = MetaData(
        naming_convention=settings.db.naming_convention,
    )

    id: Mapped[int] = mapped_column(primary_key=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self) -> str:
        pk: Any = getattr(self, "id", None)
        return f"<{type(self).__name__} id={pk}>"
