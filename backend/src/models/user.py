"""Модель пользователя."""

from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Enum, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.db.base import Base

if TYPE_CHECKING:
    from models.cart import Cart


class UserRole(StrEnum):
    """Роли пользователя."""

    USER = "user"
    ADMIN = "admin"


class User(Base):
    """Пользователь магазина."""

    __tablename__ = "user"

    username: Mapped[str] = mapped_column(
        String(32),
        unique=True,
        index=True,
        nullable=False,
    )
    email: Mapped[str] = mapped_column(
        String(254),
        unique=True,
        index=True,
        nullable=False,
    )
    # Хранится только хеш (argon2), пароль в открытом виде невозможен.
    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    full_name: Mapped[str | None] = mapped_column(String(128))
    # values_callable заставляет хранить значения ("user"/"admin"),
    # а не имена членов enum ("USER"/"ADMIN").
    role: Mapped[UserRole] = mapped_column(
        Enum(
            UserRole,
            name="user_role",
            values_callable=lambda enum: [e.value for e in enum],
        ),
        default=UserRole.USER,
        server_default=UserRole.USER.value,
        nullable=False,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        server_default="true",
        nullable=False,
    )

    cart: Mapped["Cart"] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        uselist=False,
    )
