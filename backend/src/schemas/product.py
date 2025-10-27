from pydantic import BaseModel
from pydantic.v1.networks import int_domain_regex


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
