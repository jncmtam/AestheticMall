// New file: src/pages/ProductDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api";
import { useCart } from "../contexts/CartContext";

interface Product { id: number; name: string; description: string; price: number; image: string; details: string; }

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (id) getProductById(parseInt(id)).then(setProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img src={product.image || "placeholder.jpg"} alt={product.name} className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow" />
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-purple-500 mb-4">${product.price}</p>
        <p className="mb-6">{product.description}</p>
        <p className="mb-6">{product.details || "Additional details here."}</p>
        <button onClick={() => addItem(product, 1)} className="bg-green-500 text-white px-6 py-3 rounded-lg">Add to Cart</button>
      </div>
    </div>
  );
}