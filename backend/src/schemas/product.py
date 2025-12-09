from pydantic import BaseModel


class BaseProduct(BaseModel):
    name: str
    price: int
    image_url: str


class Product(BaseProduct):
    id: int


class ProductCard(BaseProduct):
    id: int


class CreateProduct(BaseProduct):
    name: str
    description: str | None
    price: int
    image_url: str
