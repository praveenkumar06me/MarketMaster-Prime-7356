import { BsStarFill, BsStar } from 'react-icons/bs';

export default function RatingSummary({ reviews }) {
  const averageRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;
  
  const ratingCounts = reviews.reduce((acc, rev) => {
    acc[rev.rating] = (acc[rev.rating] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="text-4xl font-bold mr-4">
          {averageRating.toFixed(1)}
        </div>
        <div>
          <div className="flex text-yellow-400 mb-1">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.round(averageRating) ? <BsStarFill /> : <BsStar />}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Based on {reviews.length} reviews
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map(rating => {
          const count = ratingCounts[rating] || 0;
          const percentage = (count / reviews.length) * 100 || 0;
          
          return (
            <div key={rating} className="flex items-center">
              <span className="w-12 text-sm">{rating} stars</span>
              <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-yellow-400 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-12 text-sm text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}