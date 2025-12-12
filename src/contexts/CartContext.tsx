// New file: src/contexts/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { addToCart, getCart } from "../api";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (product: any, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = async () => {
    const data = await getCart();
    setCartItems(data);
  };

  const addItem = async (product: any, quantity: number) => {
    await addToCart(product.id, quantity);
    loadCart();
  };

  const removeItem = (id: number) => {
    // Implement remove API if needed
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = async () => {
    await checkout();
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};