from db import Base
from sqlalchemy import Column, Integer, String, text

class User(Base):
  __tablename__ = "users"
  id = Column(Integer, primary_key=True, nullable=False)
  name = Column(String, nullable=False)
  username=Column(String, unique=True, nullable=False)