import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import SearchFilters from '../components/SearchFilters';
import { useSearch } from '../hooks/useSearch';
import { PRODUCTS } from '../data/products';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const { results, sortBy, setSortBy } = useSearch(PRODUCTS, searchTerm, filters);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div>
      <SearchFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {results.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}