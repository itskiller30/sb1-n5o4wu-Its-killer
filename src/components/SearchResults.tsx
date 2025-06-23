import React from 'react';
import { Star, ExternalLink, ShoppingCart, TrendingUp, Award, MapPin } from 'lucide-react';
import { SearchResult } from '../services/productSearch';
import { generateAffiliateLink, trackAffiliateClick } from '../utils/affiliate';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading, query }) => {
  const handlePurchaseClick = async (result: SearchResult) => {
    await trackAffiliateClick(`search_${result.title}`, result.marketplace.toLowerCase());
    const affiliateUrl = generateAffiliateLink(result.url, result.marketplace.toLowerCase() as any);
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900/50 rounded-xl p-8 border border-holiday-gold/20">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-holiday-gold"></div>
          <span className="text-holiday-silver text-lg">Searching across all marketplaces...</span>
        </div>
        <div className="mt-4 text-center text-holiday-silver/70">
          Comparing prices from Amazon, eBay, Walmart, Target, Best Buy and more...
        </div>
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="bg-gray-900/50 rounded-xl p-8 border border-holiday-gold/20 text-center">
        <div className="space-y-4">
          <div className="text-6xl">🔍</div>
          <h3 className="text-xl font-semibold text-white">No results found for "{query}"</h3>
          <p className="text-holiday-silver">Try adjusting your search terms or filters</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="text-sm text-holiday-silver/70">Suggestions:</span>
            {['wireless headphones', 'smart home', 'kitchen appliances'].map(suggestion => (
              <button
                key={suggestion}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-holiday-silver rounded-full text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  // Group results by product similarity and find best deals
  const groupedResults = results.reduce((groups: Record<string, SearchResult[]>, result) => {
    const key = result.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20);
    if (!groups[key]) groups[key] = [];
    groups[key].push(result);
    return groups;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Search Results for "{query}" ({results.length} found)
        </h2>
        <div className="flex items-center gap-2 text-holiday-silver">
          <TrendingUp className="w-5 h-5" />
          <span>Best deals highlighted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => {
          const isLowestPrice = results
            .filter(r => r.title.toLowerCase().includes(result.title.toLowerCase().split(' ')[0]))
            .every(r => result.price <= r.price);

          return (
            <div
              key={`${result.marketplace}-${index}`}
              className={`group relative bg-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${
                isLowestPrice 
                  ? 'border-holiday-green/50 shadow-lg shadow-holiday-green/20' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {isLowestPrice && (
                <div className="absolute top-3 left-3 bg-holiday-green/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 z-10">
                  <Award className="w-3 h-3" />
                  Best Price
                </div>
              )}

              <div className="relative h-48 overflow-hidden">
                {result.image ? (
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                    <ShoppingCart className="w-16 h-16 text-gray-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-holiday-silver px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {result.marketplace}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-holiday-gold transition-colors mb-2">
                  {result.title}
                </h3>

                <div className="flex items-center justify-between mb-3">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-holiday-gold">
                      ${result.price.toLocaleString()}
                    </div>
                    {isLowestPrice && (
                      <div className="text-xs text-holiday-green flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Lowest price found
                      </div>
                    )}
                  </div>
                  
                  {result.rating && (
                    <div className="flex items-center gap-1 text-holiday-silver">
                      <Star className="w-4 h-4 fill-holiday-gold text-holiday-gold" />
                      <span className="text-sm font-medium">{result.rating.toFixed(1)}</span>
                      {result.reviews && (
                        <span className="text-xs text-holiday-silver/70">
                          ({result.reviews.toLocaleString()})
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePurchaseClick(result)}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isLowestPrice
                        ? 'bg-gradient-to-r from-holiday-green via-holiday-green/90 to-holiday-green/80 hover:from-holiday-green/90 hover:to-holiday-green text-white'
                        : 'bg-gradient-to-r from-holiday-gold via-holiday-gold/90 to-holiday-gold/80 hover:from-holiday-gold/90 hover:to-holiday-gold text-gray-900'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Now
                  </button>
                  
                  <button
                    onClick={() => window.open(result.url, '_blank')}
                    className="px-3 py-2.5 bg-gray-800/50 hover:bg-gray-700/50 text-holiday-silver hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-holiday-silver/60 text-center mt-2">
                  Affiliate link • No extra cost to you
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;