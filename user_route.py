from fastapi import APIRouter, Depends, HTTPException
from db import get_db
from sqlalchemy.orm import Session
from user_model import User

router = APIRouter(
  prefix='/user',
  tags=["Users"]
)

print("Router defined")

@router.post('/')
def add_user(username: str, name: str, db: Session = Depends(get_db)):
  user = db.query(User).filter(User.username == username).first()
  if user:
    raise HTTPException(status_code=400, detail="User already existes, can't register")
  user = User(username = username, name = name)
  db.add(user)
  db.commit()
  return user

@router.get('/')
def get_all_users(db: Session = Depends(get_db)):
  users = db.query(User).all()
  return users
  
@router.get('/{id}')
def get_user(id: int, db: Session = Depends(get_db)):
  user = db.query(User).filter(User.id == id).first()
  if not user:
      raise HTTPException(status_code=400, detail="User not found. Invalid UserID")
  return user
  
@router.put('/{id}')
def update_user(id: int, name: str, username: str, db: Session = Depends(get_db)):
  user = db.query(User).filter(User.id == id).first()
  if not user:
      raise HTTPException(status_code=400, detail="User not found. Invalid UserID")
  if username:
      same_username = db.query(User).filter(User.username == username).first  ()
      if same_username and same_username.id != user.id:
          raise HTTPException(status_code=400, detail="Invalid username")
      user.username = username
  if name:
      user.name = name
  db.commit()
  return user
  
@router.delete('/{id}')
def delete_user(id: int, db: Session = Depends(get_db)):
  user = db.query(User).filter(User.id == id).first()
  if not user:
      raise HTTPException(status_code=400, detail="User not found. Invalid UserID")
  db.delete(user)
  db.commit()
  return user