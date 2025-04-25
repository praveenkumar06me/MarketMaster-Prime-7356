import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard Shipping (3-5 business days)', price: 5.99 },
  { id: 'express', label: 'Express Shipping (1-2 business days)', price: 14.99 },
];

const PAYMENT_METHODS = [
  { id: 'credit', label: 'Credit Card' },
  { id: 'debit', label: 'Debit Card' },
  { id: 'paypal', label: 'PayPal' },
];

export default function Checkout() {
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const cartTotal = getCartTotal();
  const selectedShipping = SHIPPING_METHODS.find(m => m.id === shippingMethod);
  const shippingCost = cartTotal >= 50 ? 0 : selectedShipping.price;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shippingCost + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, we would:
    // 1. Process payment
    // 2. Create order in database
    // 3. Send confirmation email
    // 4. Update inventory

    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
          >
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    defaultValue={user.address}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Shipping Method</h2>
              <div className="space-y-3">
                {SHIPPING_METHODS.map(method => (
                  <label key={method.id} className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value={method.id}
                      checked={shippingMethod === method.id}
                      onChange={e => setShippingMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span>{method.label}</span>
                    <span className="ml-auto">${method.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(method => (
                  <label key={method.id} className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-primary font-bold py-2 px-4 rounded-md mt-6 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}