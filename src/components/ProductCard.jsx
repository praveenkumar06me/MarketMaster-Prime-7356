import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { BsStarFill } from 'react-icons/bs';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      className="bg-white p-4 rounded-lg shadow-md flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="flex-grow">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="text-lg font-medium text-gray-800 truncate">
          {product.title}
        </h3>
        <div className="flex items-center mt-2">
          <BsStarFill className="text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">{product.category}</div>
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold">${product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-primary px-4 py-2 rounded-md font-medium"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}