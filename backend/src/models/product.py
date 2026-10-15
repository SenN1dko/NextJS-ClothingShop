"""Модель товара."""

from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import (
    CheckConstraint,
    ForeignKey,
    Index,
    Numeric,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.db.base import Base

if TYPE_CHECKING:
    from models.cart import CartItem
    from models.category import Category


class Product(Base):
    """Товар магазина одежды."""

    __tablename__ = "product"
    __table_args__ = (
        CheckConstraint("price >= 0", name="price_non_negative"),
        CheckConstraint("stock >= 0", name="stock_non_negative"),
        CheckConstraint(
            "discount_percent IS NULL OR"
            " (discount_percent >= 0 AND discount_percent <= 100)",
            name="discount_percent_range",
        ),
        Index("ix_product_category_id_name", "category_id", "name"),
    )

    name: Mapped[str] = mapped_column(
        String(128),
        index=True,
        nullable=False,
    )
    slug: Mapped[str] = mapped_column(
        String(128),
        unique=True,
        index=True,
        nullable=False,
    )
    description: Mapped[str] = mapped_column(
        Text,
        default="",
        server_default="",
        nullable=False,
    )
    brand: Mapped[str | None] = mapped_column(String(64), index=True)

    # Денежные значения храним в Numeric, а не в Integer,
    # чтобы не терять копейки.
    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )
    discount_percent: Mapped[int | None] = mapped_column()

    image_url: Mapped[str] = mapped_column(
        String(512),
        nullable=False,
    )
    # Дополнительные изображения товара.
    images: Mapped[list[str]] = mapped_column(
        ARRAY(String(512)),
        default=list,
        server_default="{}",
        nullable=False,
    )

    sizes: Mapped[list[str]] = mapped_column(
        ARRAY(String(8)),
        default=list,
        server_default="{}",
        nullable=False,
    )
    colors: Mapped[list[str]] = mapped_column(
        ARRAY(String(32)),
        default=list,
        server_default="{}",
        nullable=False,
    )

    stock: Mapped[int] = mapped_column(
        default=0,
        server_default="0",
        nullable=False,
    )
    is_active: Mapped[bool] = mapped_column(
        default=True,
        server_default="true",
        nullable=False,
    )

    category_id: Mapped[int] = mapped_column(
        ForeignKey("category.id", ondelete="RESTRICT"),
        nullable=False,
    )
    category: Mapped["Category"] = relationship(
        back_populates="products",
    )

    cart_items: Mapped[list["CartItem"]] = relationship(
        back_populates="product",
        cascade="all, delete-orphan",
    )
