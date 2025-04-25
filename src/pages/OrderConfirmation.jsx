import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsCheckCircle } from 'react-icons/bs';

export default function OrderConfirmation() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-green-500 text-6xl mb-6 flex justify-center"
      >
        <BsCheckCircle />
      </motion.div>
      
      <h1 className="text-3xl font-bold mb-4">
        Thank You for Your Order!
      </h1>
      
      <p className="text-gray-600 mb-8">
        Your order has been successfully placed. We'll send you an email with your order details
        and tracking information once your package ships.
      </p>

      <div className="space-x-4">
        <Link
          to="/orders"
          className="bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-primary px-6 py-2 rounded-md font-medium"
        >
          View Orders
        </Link>
        <Link
          to="/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}