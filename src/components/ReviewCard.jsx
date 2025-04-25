import { motion } from 'framer-motion';
import { BsStarFill, BsHandThumbsUp } from 'react-icons/bs';
import { format } from 'date-fns';

export default function ReviewCard({ review, onHelpful }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <BsStarFill
                key={i}
                className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <h4 className="ml-2 font-bold">{review.title}</h4>
        </div>
        <span className="text-sm text-gray-500">
          {format(new Date(review.date), 'MMM d, yyyy')}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-gray-600">{review.content}</p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <span className="font-medium">By {review.userName}</span>
          {review.verified && (
            <span className="text-green-600 text-xs">Verified Purchase</span>
          )}
        </div>
        
        <button
          onClick={() => onHelpful(review.id)}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <BsHandThumbsUp className="mr-1" />
          <span>Helpful ({review.helpful})</span>
        </button>
      </div>
    </motion.div>
  );
}