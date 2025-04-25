import { Link, useNavigate } from 'react-router-dom';
import { BsCart3, BsPerson } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar({ onSearch }) {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate('/');
  };

  return (
    <nav className="bg-amazon-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white text-2xl font-bold">
            amazon
          </Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Amazon"
                className="w-full py-2 px-4 pr-10 rounded-md"
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <BiSearch className="text-gray-500 text-xl" />
              </button>
            </div>
          </form>

          <div className="flex items-center space-x-6">
            <Link 
              to={user ? "/account" : "/login"} 
              className="text-white flex items-center hover:text-amazon-yellow"
            >
              <BsPerson className="text-2xl" />
              <div className="ml-2 text-sm">
                <div className="font-medium">
                  {user ? `Hello, ${user.name.split(' ')[0]}` : 'Sign In'}
                </div>
                <div className="text-xs">Account & Lists</div>
              </div>
            </Link>

            <Link 
              to="/orders" 
              className="text-white hover:text-amazon-yellow hidden md:block"
            >
              <div className="text-sm">
                <div className="font-medium">Returns</div>
                <div className="text-xs">& Orders</div>
              </div>
            </Link>

            <Link 
              to="/cart" 
              className="text-white flex items-center hover:text-amazon-yellow"
            >
              <div className="relative">
                <BsCart3 className="text-2xl" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amazon-yellow text-amazon-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="ml-2">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}