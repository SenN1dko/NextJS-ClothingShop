from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy.types import Integer, String, Text
from core import Base

if TYPE_CHECKING:
    from .category import Category


class Product(Base):
    name: Mapped[str] = mapped_column(
        String(64),
        index=True,
    )
    description: Mapped[str] = mapped_column(
        Text,
        default="",
        server_default="",
    )

    price: Mapped[int] = mapped_column(
        Integer,
    )

    discounPrice: Mapped[int | None] = mapped_column(
        Integer,
    )
    discount: Mapped[int | None] = mapped_column(
        Integer,
    )

    category_id: Mapped[int] = mapped_column(
        ForeignKey("category.id"),
    )

    category: Mapped["Category"] = relationship(
        back_populates="products"
    )
