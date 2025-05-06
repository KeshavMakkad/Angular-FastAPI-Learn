from fastapi import FastAPI
from db import get_db, Base, engine
from user_model import User
from user_route import router as user_router
app = FastAPI()

Base.metadata.create_all(bind=engine)
app.include_router(user_router)

@app.get('/')
def hello_world():
  return {"message": "Hello World !"}