from schemas.product import ProductCard
from schemas import DataResponse

from fastapi import APIRouter

router = APIRouter(tags=["product"])


@router.get("/")
async def get_product_cards():
    return [
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
    ]
