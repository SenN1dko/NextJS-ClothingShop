from pydantic import BaseModel


class BaseProduct(BaseModel):
    name: str
    description: str
    price: int
    image_url: str


class CreateProduct(BaseProduct):
    name: str
    description: str
    price: int
    image_url: str
