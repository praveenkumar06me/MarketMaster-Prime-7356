import { useState, useMemo } from 'react';

export function useSearch(items, searchTerm, filters = {}) {
  const [sortBy, setSortBy] = useState('relevance');

  const filteredAndSortedItems = useMemo(() => {
    let results = [...items];

    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      results = results.filter(item => 
        item.category === filters.category
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      results = results.filter(item => 
        item.price >= min && item.price <= max
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'relevance' - keep original order or implement relevance scoring
        break;
    }

    return results;
  }, [items, searchTerm, filters, sortBy]);

  return {
    results: filteredAndSortedItems,
    sortBy,
    setSortBy
  };
}