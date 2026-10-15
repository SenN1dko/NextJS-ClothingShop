"""Репозиторий пользователей."""

from sqlalchemy import or_, select

from models.user import User
from repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    """Доступ к таблице `user`."""

    model = User

    async def get_by_username(self, username: str) -> User | None:
        result = await self.session.execute(
            select(User).where(User.username == username),
        )
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> User | None:
        result = await self.session.execute(
            select(User).where(User.email == email),
        )
        return result.scalar_one_or_none()

    async def exists_username_or_email(
        self,
        username: str,
        email: str,
    ) -> bool:
        """Проверяет занятость логина или e-mail."""
        result = await self.session.execute(
            select(User.id)
            .where(or_(User.username == username, User.email == email))
            .limit(1),
        )
        return result.scalar_one_or_none() is not None
