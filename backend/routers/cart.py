# routers/cart.py
from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
import crud, schemas
from database import get_db

router = APIRouter(prefix="/cart", tags=["cart"])

def get_session_id(x_session_id: str = Header(None)):
    if not x_session_id:
        raise HTTPException(400, "Missing session ID")
    return x_session_id

@router.get("/")
def get_cart(session_id: str = Depends(get_session_id), db: Session = Depends(get_db)):
    return crud.get_cart(db, session_id)

@router.post("/")
def add_to_cart(item: schemas.CartItemBase, session_id: str = Depends(get_session_id), db: Session = Depends(get_db)):
    return crud.add_to_cart(db, item, session_id)

@router.delete("/clear")
def clear_cart(session_id: str = Depends(get_session_id), db: Session = Depends(get_db)):
    db.query(models.CartItem).filter(models.CartItem.session_id == session_id).delete()
    db.commit()
    return {"message": "Cart cleared"}