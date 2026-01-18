from fastapi import APIRouter, HTTPException
from user_schema import User, UserResponse

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# -----------------------------
# In-memory dummy database
# -----------------------------
users_db = [
    {
        "id": 1,
        "name": "Alice Johnson",
        "username": "alice"
    },
    {
        "id": 2,
        "name": "Bob Smith",
        "username": "bob"
    }
]

current_id = 3


@router.post("/", response_model=UserResponse)
def add_user(user_data: User):
    global current_id

    for user in users_db:
        if user["username"] == user_data.username:
            raise HTTPException(status_code=400, detail="User already exists")

    new_user = {
        "id": current_id,
        "name": user_data.name,
        "username": user_data.username
    }

    users_db.append(new_user)
    current_id += 1
    return new_user


@router.get("/", response_model=list[UserResponse])
def get_all_users():
    return users_db


@router.get("/{id}", response_model=UserResponse)
def get_user(id: int):
    for user in users_db:
        if user["id"] == id:
            return user
    raise HTTPException(status_code=404, detail="User not found")


@router.put("/{id}", response_model=UserResponse)
def update_user(id: int, user_data: User):
    for user in users_db:
        if user["id"] == id:
            user["name"] = user_data.name
            user["username"] = user_data.username
            return user
    raise HTTPException(status_code=404, detail="User not found")


@router.delete("/{id}")
def delete_user(id: int):
    for index, user in enumerate(users_db):
        if user["id"] == id:
            users_db.pop(index)
            return {"message": "User deleted"}
    raise HTTPException(status_code=404, detail="User not found")
