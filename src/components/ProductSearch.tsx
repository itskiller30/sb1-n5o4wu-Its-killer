import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
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
      const results = await searchProducts(query.trim());
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
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Search Products</h2>
          <p className="text-slate-400">Find the best products across all major retailers</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for products (e.g., headphones, laptop, coffee)..."
            className="w-full bg-slate-700 border border-slate-600 rounded-xl px-6 py-4 pl-14 pr-32 text-white text-lg placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            disabled={isSearching}
          />
          <Search className="absolute left-5 top-5 w-6 h-6 text-blue-400" />
          
          <button
            onClick={handleSearch}
            disabled={isSearching || !query.trim() || query.trim().length < 2}
            className="absolute right-3 top-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
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
          <p className="text-slate-400 text-sm mb-3">Try these popular searches:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickSearches.map((search) => (
              <button
                key={search}
                onClick={() => handleQuickSearch(search)}
                disabled={isSearching}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-slate-300 hover:text-white rounded-full text-sm border border-slate-600 hover:border-blue-500 transition-all"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;