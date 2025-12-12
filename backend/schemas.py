# schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CategoryBase(BaseModel):
    name: str

class Category(CategoryBase):
    id: int
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image: Optional[str] = None
    category_id: int

class Product(ProductBase):
    id: int
    category: Category
    class Config:
        from_attributes = True

class BlogBase(BaseModel):
    title: str
    content: str
    author: Optional[str] = None

class Blog(BlogBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class CartItemBase(BaseModel):
    product_id: int
    quantity: int = 1

class CartItem(CartItemBase):
    id: int
    product: Product
    class Config:
        from_attributes = True