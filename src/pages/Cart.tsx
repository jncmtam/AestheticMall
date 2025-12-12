// New file: src/pages/Cart.tsx
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cartItems, removeItem, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b py-4">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
                <button onClick={() => removeItem(item.id)} className="text-red-500">Remove</button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <span className="text-xl font-bold">Total: ${total}</span>
            <button onClick={clearCart} className="bg-blue-500 text-white px-6 py-3 rounded">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}