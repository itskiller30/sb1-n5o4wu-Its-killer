import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Loader2, TrendingUp, X, Zap, Star } from 'lucide-react';
import { searchProducts, SearchResult } from '../services/productSearch';
import toast from 'react-hot-toast';

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
    rating: 4,
    marketplace: '',
    sortBy: 'rating'
  });
  
  const [isSearching, setIsSearching] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const popularSearches = [
    'wireless headphones', 'laptop computer', 'smartphone', 'coffee maker',
    'kitchen appliances', 'fitness equipment', 'office chair', 'gaming mouse',
    'bluetooth speaker', 'tablet', 'smartwatch', 'air fryer'
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

  // Debounced filter change notification
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange(filters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, onFiltersChange]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      toast.error('Please enter at least 2 characters');
      return;
    }
    
    const trimmedQuery = searchQuery.trim();
    
    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    setIsSearching(true);
    console.log('🔍 Starting search for:', trimmedQuery);
    
    try {
      const results = await searchProducts(trimmedQuery);
      console.log('📊 Search results received:', results.length);
      
      // Apply filters to results
      let filteredResults = results.filter(result => {
        const matchesCategory = !filters.category || filters.category === 'All Categories' || 
          result.category?.toLowerCase().includes(filters.category.toLowerCase());
        const matchesPrice = result.price >= filters.priceRange[0] && result.price <= filters.priceRange[1];
        const matchesRating = !filters.rating || !result.rating || result.rating >= filters.rating;
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

      console.log('✨ Filtered results:', filteredResults.length);
      onResults(filteredResults);
      setSuggestions([]);
      
    } catch (error) {
      console.error('💥 Search failed:', error);
      toast.error('Search failed. Please try again.');
      onResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [filters, onResults, searchTimeout]);

  const handleSearch = useCallback(() => {
    if (filters.query && filters.query.trim().length >= 2) {
      performSearch(filters.query);
    } else {
      toast.error('Please enter at least 2 characters to search');
    }
  }, [filters.query, performSearch]);

  const handleInputChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, query: value }));
    
    // Generate suggestions
    if (value.length > 1) {
      const matchingSuggestions = popularSearches.filter(search =>
        search.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matchingSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, []);

  const selectSuggestion = useCallback(async (suggestion: string) => {
    setFilters(prev => ({ ...prev, query: suggestion }));
    setSuggestions([]);
    
    // Auto-search when suggestion is selected
    await performSearch(suggestion);
  }, [performSearch]);

  const clearSearch = useCallback(() => {
    setFilters(prev => ({ ...prev, query: '' }));
    setSuggestions([]);
    onResults([]);
  }, [onResults]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-2xl">
      <div className="space-y-8">
        {/* Search Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-blue-400 animate-pulse" />
            <h2 className="text-3xl font-bold text-white">
              Search <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">itsKiller</span> Products
            </h2>
            <Star className="w-8 h-8 text-yellow-400 animate-twinkle" />
          </div>
          <p className="text-slate-300 text-lg">
            Find the highest-rated products across all major retailers in seconds
          </p>
        </div>

        {/* Main Search Bar */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={filters.query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for products (e.g., wireless headphones, coffee maker, laptop)..."
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-6 py-5 pl-16 pr-36 text-white text-xl placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-lg"
              disabled={isSearching}
            />
            <Search className="absolute left-6 top-6 w-7 h-7 text-blue-400" />
            
            <div className="absolute right-3 top-2.5 flex gap-2">
              {filters.query && !isSearching && (
                <button
                  onClick={clearSearch}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  title="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleSearch}
                disabled={isSearching || !filters.query.trim() || filters.query.trim().length < 2}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 transform"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search Suggestions */}
          {suggestions.length > 0 && !isSearching && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-10 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full text-left px-6 py-4 hover:bg-slate-700 text-white first:rounded-t-xl last:rounded-b-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span className="font-medium text-lg">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-300 ${
              showAdvanced 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                : 'bg-slate-700 text-slate-300 border-slate-600 hover:border-blue-500 hover:text-white hover:bg-slate-600'
            }`}
          >
            <Filter className="w-5 h-5" />
            Advanced Filters
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="px-6 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-lg"
          >
            <option value="rating">Highest Rated First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="reviews">Most Reviews</option>
          </select>

          <select
            value={filters.marketplace}
            onChange={(e) => setFilters(prev => ({ ...prev, marketplace: e.target.value }))}
            className="px-6 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-lg"
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
          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-slate-300 text-lg mb-3 font-medium">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-lg"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All Categories' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-lg mb-3 font-medium">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [Number(e.target.value), prev.priceRange[1]] 
                    }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-lg"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], Number(e.target.value)] 
                    }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 text-lg"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-lg mb-3 font-medium">
                  Minimum Rating: {filters.rating}/5 ⭐
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  className="w-full h-3 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-slate-400 mt-2">
                  <span>Any</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popular Searches */}
        <div>
          <p className="text-slate-300 text-lg mb-4 font-medium text-center">🔥 Popular Searches:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {popularSearches.slice(0, 8).map((search, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(search)}
                disabled={isSearching}
                className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 hover:text-white rounded-full text-sm border border-slate-600/50 hover:border-blue-500/50 transition-all hover:scale-105 transform"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Search Status */}
        {isSearching && (
          <div className="flex items-center justify-center py-6">
            <div className="bg-blue-500/20 rounded-full p-4 border border-blue-400/30">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
            <div className="ml-4">
              <div className="text-blue-400 font-bold text-lg">Searching all platforms...</div>
              <div className="text-slate-400">Finding the best deals and highest ratings</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;