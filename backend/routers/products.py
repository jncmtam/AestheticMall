# routers/products.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db
import shutil
import os

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=list[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_products(db, skip, limit)

@router.get("/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(404, "Product not found")
    return product

# Upload ảnh (optional)
@router.post("/upload-image/{product_id}")
async def upload_image(product_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(404)
    file_location = f"static/images/{file.filename}"
    with open(file_location, "wb+") as f:
        shutil.copyfileobj(file.file, f)
    product.image = file.filename
    db.commit()
    return {"filename": file.filename}