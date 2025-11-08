from typing import TYPE_CHECKING
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy.types import Integer, String
from core.db.base import Base

if TYPE_CHECKING:
    from .product import Product


class Category(Base):
    name: Mapped[str] = mapped_column(
        Integer,
        index=True,
    )
    slug: Mapped[str] = mapped_column(
        String,
        index=True,
    )
    products: Mapped[list["Product"]] = relationship(
        back_populates="category"
    )
