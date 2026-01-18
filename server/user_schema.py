from pydantic import BaseModel

class User(BaseModel):
    name: str
    username: str

class UserResponse(User):
    id: int
