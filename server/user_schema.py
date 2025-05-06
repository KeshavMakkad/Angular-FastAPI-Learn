from pydantic import BaseModel

class User(BaseModel) :
  name: str
  username: str
  
  class Config:
    orm_mode: True
