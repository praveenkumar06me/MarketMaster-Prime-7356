import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Account from './pages/Account';
import Orders from './pages/Orders';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar onSearch={setSearchTerm} />
          <main className="max-w-7xl mx-auto px-4 py-6">
            <Routes>
              <Route index element={<Home searchTerm={searchTerm} />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-confirmation" element={<OrderConfirmation />} />
              <Route path="login" element={<Login />} />
              <Route path="account" element={<Account />} />
              <Route path="orders" element={<Orders />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}