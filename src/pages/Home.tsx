// Updated src/pages/Home.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getBlogs } from "../api";

interface Product { id: number; name: string; description: string; price: number; image: string; } // Added image
interface BlogPost { id: number; title: string; content: string; excerpt: string; }

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    getProducts().then(data => setFeaturedProducts(data.slice(0, 3)));
    getBlogs().then(data => setRecentBlogs(data.slice(0, 3)));
  }, []);

  return (
    <div>
      <section className="hero bg-gradient-to-br from-pink-300 to-purple-300 p-16 text-center rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">Elegant Aesthetic Gifts for Couples</h1>
        <p className="text-lg mb-8">Discover refined treasures that celebrate love with subtlety and style.</p>
        <Link to="/products" className="bg-white text-purple-500 px-6 py-3 rounded-full font-semibold">Shop Now</Link>
      </section>

      <section className="featured-products mt-12">
        <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map(p => (
            <div key={p.id} className="product-card bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition">
              <img src={p.image || "placeholder.jpg"} alt={p.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-gray-600">{p.description.substring(0, 50)}...</p>
                <p className="text-purple-500 font-semibold">${p.price}</p>
                <Link to={`/products/${p.id}`} className="block mt-2 bg-purple-500 text-white px-4 py-2 rounded">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="recent-blogs mt-12">
        <h2 className="text-3xl font-semibold mb-6">Recent Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBlogs.map(b => (
            <div key={b.id} className="blog-card bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-bold">{b.title}</h3>
              <p className="text-gray-600">{b.excerpt || b.content.substring(0, 100)}...</p>
              <Link to={`/blog/${b.id}`} className="text-purple-500">Read More</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}