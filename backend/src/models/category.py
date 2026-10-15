"""Модель категории товара."""

from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.db.base import Base

if TYPE_CHECKING:
    from models.product import Product


class Category(Base):
    """Категория товара, например `men`, `women`, `kids`."""

    __tablename__ = "category"

    name: Mapped[str] = mapped_column(
        String(64),
        unique=True,
        index=True,
        nullable=False,
    )
    slug: Mapped[str] = mapped_column(
        String(64),
        unique=True,
        index=True,
        nullable=False,
    )
    description: Mapped[str | None] = mapped_column(String(512))

    products: Mapped[list["Product"]] = relationship(
        back_populates="category",
    )
