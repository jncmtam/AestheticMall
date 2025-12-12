// New file: src/components/Header.tsx
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // We'll create this context

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Aesthetic Gifts for Couples</Link>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart" className="relative">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." className="p-2 rounded text-black" />
        </div>
      </nav>
    </header>
  );
}