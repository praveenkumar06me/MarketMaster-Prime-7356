import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../data/products';
import { REVIEWS } from '../data/reviews';
import ReviewForm from '../components/ReviewForm';
import ReviewCard from '../components/ReviewCard';
import RatingSummary from '../components/RatingSummary';
import { BsStarFill } from 'react-icons/bs';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  const [reviews, setReviews] = useState(REVIEWS[id] || []);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleSubmitReview = (reviewData) => {
    const newReview = {
      id: reviews.length + 1,
      userId: user?.id || 0,
      userName: user?.name || 'Anonymous',
      date: new Date().toISOString().split('T')[0],
      verified: false,
      helpful: 0,
      ...reviewData
    };

    setReviews(prev => [newReview, ...prev]);
    setShowReviewForm(false);
  };

  const handleHelpful = (reviewId) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          src={product.image}
          alt={product.title}
          className="w-full object-contain rounded-lg"
        />
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              <BsStarFill />
              <span className="ml-1 text-gray-700">
                {product.rating} ({reviews.length} reviews)
              </span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-3xl font-bold mb-6">${product.price}</div>
          
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-primary py-3 rounded-md font-medium mb-4"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <RatingSummary reviews={reviews} />
            
            {user && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md font-medium mb-6"
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            )}
          </div>

          <div className="lg:col-span-2">
            {showReviewForm && (
              <div className="mb-6">
                <ReviewForm onSubmit={handleSubmitReview} />
              </div>
            )}

            <div className="space-y-4">
              {reviews.map(review => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onHelpful={handleHelpful}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}