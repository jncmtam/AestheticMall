# main.py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import products, blogs, categories, cart

# Tạo bảng lần đầu
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Aesthetic Gifts for Couples API",
    description="Backend cho shop quà tặng couple tinh tế",
    version="1.0.0"
)

# CORS cho React dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(blogs.router)
app.include_router(categories.router)
app.include_router(cart.router)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def home():
    return {"message": "Welcome to Aesthetic Gifts API"}