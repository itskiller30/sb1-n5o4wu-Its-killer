import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader2, TrendingUp, X } from 'lucide-react';
import { searchProducts, SearchResult } from '../services/productSearch';

interface ProductSearchProps {
  onResults: (results: SearchResult[]) => void;
  onFiltersChange: (filters: SearchFilters) => void;
}

interface SearchFilters {
  query: string;
  category: string;
  priceRange: [number, number];
  rating: number;
  marketplace: string;
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'reviews';
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onResults, onFiltersChange }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    marketplace: '',
    sortBy: 'relevance'
  });
  
  const [isSearching, setIsSearching] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const popularSearches = [
    'wireless headphones', 'smart home devices', 'kitchen appliances',
    'fitness equipment', 'outdoor gear', 'office chairs', 'coffee makers',
    'phone accessories', 'gaming peripherals', 'travel bags'
  ];

  const categories = [
    'All Categories', 'Electronics', 'Home & Kitchen', 'Sports & Outdoors',
    'Office Products', 'Health & Personal Care', 'Automotive', 'Books',
    'Clothing & Accessories', 'Tools & Home Improvement'
  ];

  const marketplaces = [
    'All Stores', 'Amazon', 'eBay', 'Walmart', 'Target', 'Best Buy',
    'Home Depot', 'Costco', 'Newegg', 'B&H Photo'
  ];

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleSearch = async () => {
    if (!filters.query.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await searchProducts(filters.query);
      
      // Apply filters to results
      let filteredResults = results.filter(result => {
        const matchesCategory = !filters.category || filters.category === 'All Categories' || 
          result.title.toLowerCase().includes(filters.category.toLowerCase());
        const matchesPrice = result.price >= filters.priceRange[0] && result.price <= filters.priceRange[1];
        const matchesRating = !result.rating || result.rating >= filters.rating;
        const matchesMarketplace = !filters.marketplace || filters.marketplace === 'All Stores' || 
          result.marketplace === filters.marketplace;
        
        return matchesCategory && matchesPrice && matchesRating && matchesMarketplace;
      });

      // Sort results
      filteredResults = filteredResults.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price_low':
            return a.price - b.price;
          case 'price_high':
            return b.price - a.price;
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'reviews':
            return (b.reviews || 0) - (a.reviews || 0);
          default:
            return 0;
        }
      });

      onResults(filteredResults);
      setSuggestions([]);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (value: string) => {
    setFilters(prev => ({ ...prev, query: value }));
    
    // Generate suggestions
    if (value.length > 2) {
      const matchingSuggestions = popularSearches.filter(search =>
        search.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matchingSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setFilters(prev => ({ ...prev, query: suggestion }));
    setSuggestions([]);
    // Auto-search when suggestion is selected
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const clearSearch = () => {
    setFilters(prev => ({ ...prev, query: '' }));
    setSuggestions([]);
    onResults([]);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-xl">
      <div className="space-y-6">
        {/* Main Search Bar */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={filters.query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for products across all marketplaces..."
              className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-6 py-4 pl-14 pr-32 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <Search className="absolute left-5 top-5 w-6 h-6 text-blue-400" />
            
            <div className="absolute right-3 top-2 flex gap-2">
              {filters.query && (
                <button
                  onClick={clearSearch}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleSearch}
                disabled={isSearching || !filters.query.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Search
              </button>
            </div>
          </div>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-xl z-10 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-700 text-white first:rounded-t-xl last:rounded-b-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="font-medium">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showAdvanced 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-gray-700 text-gray-300 border-gray-600 hover:border-blue-500 hover:text-white'
            }`}
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="relevance">Most Relevant</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
          </select>

          <select
            value={filters.marketplace}
            onChange={(e) => setFilters(prev => ({ ...prev, marketplace: e.target.value }))}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            {marketplaces.map(marketplace => (
              <option key={marketplace} value={marketplace === 'All Stores' ? '' : marketplace}>
                {marketplace}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All Categories' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [Number(e.target.value), prev.priceRange[1]] 
                    }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], Number(e.target.value)] 
                    }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Minimum Rating: {filters.rating}/5
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        )}

        {/* Popular Searches */}
        <div>
          <p className="text-gray-400 text-sm mb-3">Popular Searches:</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.slice(0, 6).map((search, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(search)}
                className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-full text-sm border border-gray-600/50 hover:border-blue-500/50 transition-all"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Search Status */}
        {isSearching && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-3" />
            <span className="text-gray-300">Searching across all marketplaces...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;