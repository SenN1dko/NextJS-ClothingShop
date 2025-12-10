from schemas.product import ProductCard
from schemas import DataResponse

from fastapi import APIRouter

router = APIRouter(tags=["product"])


products = [
    ProductCard(
        name="Cat",
        price=700,
        image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
        id=0,
    ),
    ProductCard(
        name="Koshka",
        price=900,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=1,
    ),
    ProductCard(
        name="Koshka",
        price=900,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=2,
    ),
    ProductCard(
        name="Koshka",
        price=900,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=3,
    ),
    ProductCard(
        name="Koshka",
        price=900,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=4,
    ),
    ProductCard(
        name="Koshka",
        price=900,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=5,
    ),
]


@router.get("/")
async def get_product_cards():
    return products


@router.get("/{product_id}")
async def get_product_by_id(product_id: int):
    for product in products:
        if product.id == product_id:
            return product
    return None  # Возвращает None, если продукт не найден
