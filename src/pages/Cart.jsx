import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const cartTotal = getCartTotal();
  const shippingFee = cartTotal >= 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shippingFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Add some products to your cart and start shopping!</p>
        <Link
          to="/"
          className="bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-primary px-6 py-2 rounded-md font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {cartItems.map(item => (
              <motion.div
                key={item.id}
                layout
                className="flex items-center p-4 border-b last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <div className="text-xl font-bold mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-x">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-primary font-bold py-2 px-4 rounded-md mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}