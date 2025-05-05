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
  try:
    user = db.query(User).filter(User.username == username).first()
    if user is None:
      raise HTTPException(status_code=400, detail="User already existes, can't register")
    user = User(username = username, name = name)
    db.add(user)
    db.commit()
    return user
  except Exception as err:
    print(err)
    raise HTTPException(status_code=500, detail="Internal Server Error, something went wrong")

@router.get('/')
def get_all_users(db: Session = Depends(get_db)):
  try:
    users = db.query(User).all()
    return users
  except:
    raise HTTPException(status_code=500, detail="Internal Server Error, something went wrong")
  
@router.get('/{id}')
def get_user(id: int, db: Session = Depends(get_db)):
  try:
    user = db.query(User).filter(User.id == id).first()
    if not user:
      raise HTTPException(status_code=400, detail="User not found. Invalid UserID")
    return user
  except:
    raise HTTPException(status_code=500, detail="Internal Server Error, something went wrong")
  
@router.put('/{id}')
def update_user(id: int, name: str, username: str, db : Session = Depends(get_db)):
  try:
    user = db.query(User).filter(User.id == id).first()
    if not user:
      raise HTTPException(status_code=418, detail="User not found. Invalid UserID")
    if name:
      user.name = name
    if username:
      user.username = username
    db.commit()
    return user
  except:
    raise HTTPException(status_code=500, detail="Internal Server Error, something went wrong")
  
@router.delete('/{id}')
def delete_user(id: int, db: Session = Depends(get_db)):
  try:
    user = db.query(User).filter(User.id == id).first()
    if not user:
      raise HTTPException(status_code=418, detail="User not found. Invalid UserID")
    db.delete(user)    
    db.commit()
    return user
  except:
    raise HTTPException(status_code=500, detail="Internal Server Error, something went wrong")