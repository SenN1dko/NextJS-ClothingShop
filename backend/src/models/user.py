from enum import unique
from sqlalchemy.orm import Mapped, mapped_column
from core.db.base import Base


class User(Base):
    username: Mapped[str] = mapped_column(unique=True)
