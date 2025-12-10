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
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=1,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=2,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=3,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=4,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=5,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=6,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=7,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=8,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=9,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=10,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=11,
        ),
            ProductCard(
            name="Koshka",
            price=900,
            image_url="https://blindfacts.com/wp-content/uploads/2018/01/The-Color-White.jpg",
            id=12,
        ),

    ]
