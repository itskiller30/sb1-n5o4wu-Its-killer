import React, { useState, useCallback } from 'react';
import { Search, Loader2, TrendingUp, X, Zap, Star } from 'lucide-react';
import { searchProducts, SearchResult } from '../services/productSearch';
import toast from 'react-hot-toast';

interface ProductSearchProps {
  onResults: (results: SearchResult[]) => void;
  onFiltersChange: (filters: any) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onResults, onFiltersChange }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const popularSearches = [
    'wireless headphones', 'laptop computer', 'smartphone', 'coffee maker',
    'kitchen appliances', 'fitness equipment', 'office chair', 'gaming mouse',
    'bluetooth speaker', 'tablet', 'smartwatch', 'air fryer'
  ];

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      toast.error('Please enter at least 2 characters');
      return;
    }
    
    const trimmedQuery = searchQuery.trim();
    setIsSearching(true);
    setSuggestions([]);
    
    try {
      console.log('🔍 Starting search for:', trimmedQuery);
      const results = await searchProducts(trimmedQuery);
      
      console.log('📊 Search results received:', results.length);
      onResults(results);
      onFiltersChange({ query: trimmedQuery });
      
      if (results.length > 0) {
        toast.success(`Found ${results.length} products across all retailers!`);
      } else {
        toast.error(`No results found for "${trimmedQuery}". Try different keywords.`);
      }
      
    } catch (error) {
      console.error('💥 Search failed:', error);
      toast.error('Search failed. Please try again.');
      onResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [onResults, onFiltersChange]);

  const handleSearch = useCallback(() => {
    if (query && query.trim().length >= 2) {
      performSearch(query);
    } else {
      toast.error('Please enter at least 2 characters to search');
    }
  }, [query, performSearch]);

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    
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
    setQuery(suggestion);
    setSuggestions([]);
    await performSearch(suggestion);
  }, [performSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
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
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for products (e.g., wireless headphones, coffee maker, laptop)..."
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-6 py-5 pl-16 pr-36 text-white text-xl placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-lg"
              disabled={isSearching}
            />
            <Search className="absolute left-6 top-6 w-7 h-7 text-blue-400" />
            
            <div className="absolute right-3 top-2.5 flex gap-2">
              {query && !isSearching && (
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
                disabled={isSearching || !query.trim() || query.trim().length < 2}
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