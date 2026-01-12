from schemas.product import ProductCard
from fastapi import HTTPException

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
        price=902,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=1,
    ),
    ProductCard(
        name="Koshka",
        price=903,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=2,
    ),
    ProductCard(
        name="Koshka",
        price=940,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=3,
    ),
    ProductCard(
        name="Koshka",
        price=950,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=4,
    ),
    ProductCard(
        name="Koshka",
        price=960,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=5,
    ),
        ProductCard(
        name="Koshka",
        price=960,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=6,
    ),
        ProductCard(
        name="Koshka",
        price=960,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=7,
    ),
        ProductCard(
        name="Koshka",
        price=960,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=8,
    ),
    
        ProductCard(
        name="Koshka",
        price=960,
        image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10",
        id=9,
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
    # если товар не найден — выбрасываем 404
    raise HTTPException(status_code=404, detail="Product not found")
