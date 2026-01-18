from fastapi import FastAPI
from user_route import router as user_router

app = FastAPI()

app.include_router(user_router)

@app.get("/")
def hello_world():
    return {"message": "Hello World!"}
