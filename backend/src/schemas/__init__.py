from pydantic import BaseModel


class DataResponse[T: BaseModel](BaseModel):
    """Model for response data."""

    data: T | None = None
