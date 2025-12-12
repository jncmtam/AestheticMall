// Updated src/pages/Products.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getCategories } from "../api";
import { useCart } from "../contexts/CartContext";

interface Product { id: number; name: string; description: string; price: number; category: string; image: string; }

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(1000); // Max price
  const { addItem } = useCart();

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  const filteredProducts = products.filter(p => 
    (selectedCategory ? p.category === selectedCategory : true) &&
    p.price <= priceRange
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      
      <div className="filters flex space-x-4 mb-8">
        <select onChange={e => setSelectedCategory(e.target.value)} className="p-2 border rounded">
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input 
          type="range" 
          min="0" max="1000" 
          value={priceRange} 
          onChange={e => setPriceRange(parseInt(e.target.value))} 
          className="w-48"
        />
        <span>Max Price: ${priceRange}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map(p => (
          <div key={p.id} className="product-card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={p.image || "placeholder.jpg"} alt={p.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{p.name}</h2>
              <p className="text-gray-600">{p.description}</p>
              <p className="text-purple-500 font-semibold">${p.price}</p>
              <button onClick={() => addItem(p, 1)} className="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2">Add to Cart</button>
              <Link to={`/products/${p.id}`} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}