# routers/blogs.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db

router = APIRouter(prefix="/blogs", tags=["blogs"])

@router.get("/", response_model=list[schemas.Blog])
def read_blogs(db: Session = Depends(get_db)):
    return crud.get_blogs(db)

@router.get("/{blog_id}", response_model=schemas.Blog)
def read_blog(blog_id: int, db: Session = Depends(get_db)):
    blog = crud.get_blog(db, blog_id)
    if not blog:
        raise HTTPException(404)
    return blog