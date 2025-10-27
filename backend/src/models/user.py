from sqlalchemy.orm import Mapped, mapped_column
from core.db.base import Base


class User(Base):
    name: Mapped[str]
