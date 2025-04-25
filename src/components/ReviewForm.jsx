import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsStar, BsStarFill } from 'react-icons/bs';

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, title, content });
    setRating(0);
    setTitle('');
    setContent('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-bold mb-4">Write a Review</h3>
      
      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="text-2xl text-yellow-400 focus:outline-none"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            >
              {star <= (hover || rating) ? <BsStarFill /> : <BsStar />}
            </button>
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">
          {rating ? `${rating} out of 5 stars` : 'Select a rating'}
        </span>
      </div>

      {/* Review Title */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Review Title"
          className="w-full px-3 py-2 border rounded-md"
          required
          maxLength={100}
        />
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review here..."
          className="w-full px-3 py-2 border rounded-md h-32 resize-none"
          required
          maxLength={1000}
        />
      </div>

      <button
        type="submit"
        disabled={!rating || !title || !content}
        className="bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-primary px-6 py-2 rounded-md font-medium disabled:opacity-50"
      >
        Submit Review
      </button>
    </motion.form>
  );
}