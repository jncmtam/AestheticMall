# crud.py
from sqlalchemy.orm import Session
import models, schemas

# Product
def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()

def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

# Blog
def get_blogs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Blog).order_by(models.Blog.created_at.desc()).offset(skip).limit(limit).all()

def get_blog(db: Session, blog_id: int):
    return db.query(models.Blog).filter(models.Blog.id == blog_id).first()

# Category
def get_categories(db: Session):
    return db.query(models.Category).all()

# Cart (dùng session_id để phân biệt guest)
def get_cart(db: Session, session_id: str):
    items = db.query(models.CartItem).filter(models.CartItem.session_id == session_id).all()
    return [
        {
            "id": item.product.id,
            "name": item.product.name,
            "price": item.product.price,
            "image": item.product.image,
            "quantity": item.quantity
        } for item in items
    ]

def add_to_cart(db: Session, item: schemas.CartItemBase, session_id: str):
    db_item = models.CartItem(
        product_id=item.product_id,
        quantity=item.quantity,
        session_id=session_id
    )
    # Nếu đã có thì tăng số lượng
    existing = db.query(models.CartItem).filter(
        models.CartItem.product_id == item.product_id,
        models.CartItem.session_id == session_id
    ).first()
    if existing:
        existing.quantity += item.quantity
    else:
        db.add(db_item)
    db.commit()
    return get_cart(db, session_id)