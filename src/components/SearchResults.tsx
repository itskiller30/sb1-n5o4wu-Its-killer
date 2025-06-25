import React from 'react';
import { Star, ExternalLink, ShoppingCart, TrendingUp, Award, MapPin, Package } from 'lucide-react';
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
      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-slate-300 text-lg">Searching across all marketplaces...</span>
        </div>
        <div className="mt-4 text-center text-slate-400">
          Comparing prices from Amazon, eBay, Walmart, Target, Best Buy and more...
        </div>
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
        <div className="space-y-4">
          <div className="text-6xl">🔍</div>
          <h3 className="text-xl font-semibold text-white">No results found for "{query}"</h3>
          <p className="text-slate-400">Try adjusting your search terms or use different keywords</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="text-sm text-slate-500">Try these instead:</span>
            {['wireless headphones', 'laptop computer', 'coffee maker'].map(suggestion => (
              <button
                key={suggestion}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full text-sm transition-colors"
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

  // Find best deals
  const bestPrice = Math.min(...results.map(r => r.price));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Search Results for "{query}" ({results.length} found)
        </h2>
        <div className="flex items-center gap-2 text-blue-400">
          <TrendingUp className="w-5 h-5" />
          <span>Best deals highlighted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => {
          const isBestDeal = result.price === bestPrice;

          return (
            <div
              key={`${result.marketplace}-${index}`}
              className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                isBestDeal 
                  ? 'border-green-500/50 shadow-lg shadow-green-500/20' 
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              {isBestDeal && (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 z-10">
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
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
                    <Package className="w-16 h-16 text-slate-500" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-slate-300 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {result.marketplace}
                </div>

                {result.inStock === false && (
                  <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    Out of Stock
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors mb-2">
                  {result.title}
                </h3>

                <div className="flex items-center justify-between mb-3">
                  <div className="space-y-1">
                    <div className={`text-2xl font-bold ${isBestDeal ? 'text-green-400' : 'text-blue-400'}`}>
                      ${result.price.toLocaleString()}
                    </div>
                    {isBestDeal && (
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Lowest price found
                      </div>
                    )}
                  </div>
                  
                  {result.rating && (
                    <div className="flex items-center gap-1 text-slate-400">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{result.rating.toFixed(1)}</span>
                      {result.reviews && (
                        <span className="text-xs text-slate-500">
                          ({result.reviews.toLocaleString()})
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {result.shippingInfo && (
                  <div className="text-xs text-slate-400 mb-3 bg-slate-700/30 rounded px-2 py-1">
                    📦 {result.shippingInfo}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePurchaseClick(result)}
                    disabled={result.inStock === false}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      result.inStock === false
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                        : isBestDeal
                        ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {result.inStock === false ? 'Out of Stock' : 'Buy Now'}
                  </button>
                  
                  <button
                    onClick={() => window.open(result.url, '_blank')}
                    className="px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-500 text-center mt-2">
                  Affiliate link • No extra cost to you
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search Tips */}
      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
        <h4 className="text-sm font-semibold text-slate-300 mb-2">💡 Search Tips:</h4>
        <div className="text-xs text-slate-400 space-y-1">
          <p>• Use specific product names for better results (e.g., "iPhone 15 Pro" vs "phone")</p>
          <p>• Try different keywords if you don't find what you're looking for</p>
          <p>• Green badges indicate the best price we found across all stores</p>
          <p>• All links include affiliate codes to support itsKiller at no extra cost to you</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;