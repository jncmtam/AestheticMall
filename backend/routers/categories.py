# routers/categories.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from crud import get_categories

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/")
def read_categories(db: Session = Depends(get_db)):
    return get_categories(db)