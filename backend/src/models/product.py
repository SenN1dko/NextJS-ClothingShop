from sqlalchemy.orm import Mapped, mapped_column
from core import Base


class Product(Base):
    name: Mapped[str]
    description: Mapped[str]

    price: Mapped[int]

    discounPrice: Mapped[int]
    discount: Mapped[int]
