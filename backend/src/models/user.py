from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import String
from core.db.base import Base


class User(Base):
    username: Mapped[str] = mapped_column(
        String(24),
        unique=True,
        index=True,
    )
    password: Mapped[str] = mapped_column(
        String,
        unique=False,
    )
