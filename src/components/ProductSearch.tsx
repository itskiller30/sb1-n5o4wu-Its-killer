import React, { useState } from 'react';
import { Search, Loader2, Zap, Star } from 'lucide-react';
import { searchProducts, SearchResult } from '../services/productSearch';
import toast from 'react-hot-toast';

interface ProductSearchProps {
  onResults: (results: SearchResult[]) => void;
  onFiltersChange: (filters: any) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onResults, onFiltersChange }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query || query.trim().length < 2) {
      toast.error('Please enter at least 2 characters');
      return;
    }
    
    setIsSearching(true);
    
    try {
      console.log('Searching for:', query);
      const results = await searchProducts(query.trim());
      console.log('Search results:', results);
      
      onResults(results);
      onFiltersChange({ query: query.trim() });
      
      if (results.length > 0) {
        toast.success(`Found ${results.length} products!`);
      } else {
        toast.error('No results found. Try "headphones", "laptop", "coffee", or "phone"');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed');
      onResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const quickSearches = ['headphones', 'laptop', 'coffee', 'phone', 'blender'];

  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    // Use setTimeout to ensure state is updated before search
    setTimeout(() => {
      searchProducts(searchTerm).then(results => {
        onResults(results);
        onFiltersChange({ query: searchTerm });
        if (results.length > 0) {
          toast.success(`Found ${results.length} products for "${searchTerm}"!`);
        }
      });
    }, 100);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-2xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold text-white">
              Search <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">itsKiller</span> Products
            </h2>
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-slate-300 text-lg">
            Find the highest-rated products across all major retailers
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for products (e.g., headphones, laptop, coffee)..."
            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-6 py-5 pl-16 pr-32 text-white text-xl placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            disabled={isSearching}
          />
          <Search className="absolute left-6 top-6 w-7 h-7 text-blue-400" />
          
          <button
            onClick={handleSearch}
            disabled={isSearching || !query.trim() || query.trim().length < 2}
            className="absolute right-3 top-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2"
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

        {/* Quick Searches */}
        <div className="text-center">
          <p className="text-slate-300 text-sm mb-3">Try these popular searches:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickSearches.map((search) => (
              <button
                key={search}
                onClick={() => handleQuickSearch(search)}
                disabled={isSearching}
                className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 text-slate-300 hover:text-white rounded-full text-sm border border-slate-600/50 hover:border-blue-500/50 transition-all"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-6">
            <div className="inline-flex items-center gap-3 bg-blue-500/20 rounded-full px-6 py-3 border border-blue-400/30">
              <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
              <span className="text-blue-400 font-medium">Searching all platforms...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;