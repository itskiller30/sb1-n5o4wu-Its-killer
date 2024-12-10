import React from 'react';
import { Link, Star } from 'lucide-react';
import { SearchResult } from '../services/productSearch';

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-6 border border-holiday-gold/20">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-holiday-gold"></div>
          <span className="ml-3 text-holiday-silver">Searching all marketplaces...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-holiday-gold/20">
      <h3 className="text-holiday-gold font-semibold mb-3">Search Results</h3>
      <div className="space-y-3">
        {results.map((result, index) => (
          <button
            key={`${result.marketplace}-${index}`}
            type="button"
            onClick={() => onSelect(result)}
            className="w-full text-left bg-gray-800 hover:bg-gray-700 p-3 rounded-lg flex items-center gap-3 transition-colors"
          >
            {result.image && (
              <img src={result.image} alt={result.title} className="w-12 h-12 object-cover rounded" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white truncate">{result.title}</p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-holiday-gold font-semibold">${result.price}</span>
                {result.rating && (
                  <div className="flex items-center gap-1 text-holiday-silver text-sm">
                    <Star className="w-4 h-4 fill-holiday-gold text-holiday-gold" />
                    {result.rating.toFixed(1)}
                    {result.reviews && (
                      <span className="text-holiday-silver/70">
                        ({result.reviews.toLocaleString()})
                      </span>
                    )}
                  </div>
                )}
              </div>
              <p className="text-holiday-silver/70 text-sm mt-1">{result.marketplace}</p>
            </div>
            <Link className="w-5 h-5 text-holiday-silver" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;