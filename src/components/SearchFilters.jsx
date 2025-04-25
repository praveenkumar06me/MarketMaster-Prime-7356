import { motion } from 'framer-motion';

export default function SearchFilters({ filters, onFilterChange, onSortChange, sortBy }) {
  const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen'];
  const priceRanges = [
    { label: 'All Prices', value: null },
    { label: 'Under $100', value: [0, 100] },
    { label: '$100 - $500', value: [100, 500] },
    { label: 'Over $500', value: [500, Infinity] }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-lg shadow-md mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="w-full border rounded-md py-2 px-3"
            value={filters.category || 'All'}
            onChange={(e) => onFilterChange('category', e.target.value === 'All' ? null : e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            className="w-full border rounded-md py-2 px-3"
            value={filters.priceRange ? JSON.stringify(filters.priceRange) : ''}
            onChange={(e) => onFilterChange('priceRange', e.target.value ? JSON.parse(e.target.value) : null)}
          >
            {priceRanges.map(range => (
              <option 
                key={range.label} 
                value={range.value ? JSON.stringify(range.value) : ''}
              >
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            className="w-full border rounded-md py-2 px-3"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}