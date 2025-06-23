import React, { useState } from 'react';
import { Users, Star, ThumbsUp, MessageCircle, Award, TrendingUp, Filter } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface CommunityRecommendationsProps {
  products: Product[];
  isLoading: boolean;
}

interface CommunityFilters {
  sortBy: 'rating' | 'reviews' | 'recent' | 'trending';
  category: string;
  minRating: number;
}

const CommunityRecommendations: React.FC<CommunityRecommendationsProps> = ({ products, isLoading }) => {
  const [filters, setFilters] = useState<CommunityFilters>({
    sortBy: 'rating',
    category: '',
    minRating: 11
  });

  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesRating = product.rating >= filters.minRating;
      return matchesCategory && matchesRating;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'recent':
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
        case 'trending':
          return (b.reviews * b.rating) - (a.reviews * a.rating);
        default:
          return 0;
      }
    });

  const communityStats = {
    totalProducts: products.length,
    averageRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length,
    totalReviews: products.reduce((sum, p) => sum + p.reviews, 0),
    topCategory: categories.reduce((top, cat) => 
      products.filter(p => p.category === cat).length > 
      products.filter(p => p.category === top).length ? cat : top, categories[0] || ''
    )
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-900/50 rounded-xl p-8 border border-holiday-gold/20">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-holiday-gold"></div>
            <span className="text-holiday-silver text-lg">Loading community recommendations...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Community Stats Header */}
      <div className="bg-gradient-to-br from-holiday-pine to-gray-900 rounded-2xl p-6 border border-holiday-gold/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-holiday-gold/20 p-3 rounded-full">
            <Users className="w-8 h-8 text-holiday-gold" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-holiday-snow">Community Recommendations</h2>
            <p className="text-holiday-silver">Curated by real users, verified by our community</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-holiday-gold">{communityStats.totalProducts}</div>
            <div className="text-sm text-holiday-silver">Products</div>
          </div>
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-holiday-green">{communityStats.averageRating.toFixed(1)}</div>
            <div className="text-sm text-holiday-silver">Avg Rating</div>
          </div>
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-holiday-red">{communityStats.totalReviews.toLocaleString()}</div>
            <div className="text-sm text-holiday-silver">Reviews</div>
          </div>
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <div className="text-lg font-bold text-holiday-silver truncate">{communityStats.topCategory}</div>
            <div className="text-sm text-holiday-silver">Top Category</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-holiday-gold" />
            <h3 className="text-lg font-semibold text-white">Filter Community Picks</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-holiday-gold"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="recent">Most Recent</option>
              <option value="trending">Trending</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-holiday-gold"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <label className="text-sm text-holiday-silver">Min Rating:</label>
              <select
                value={filters.minRating}
                onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-holiday-gold"
              >
                <option value={10}>10+</option>
                <option value={11}>11+</option>
                <option value={11.5}>11.5+</option>
                <option value={12}>12+</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Community Highlights */}
      {filteredProducts.length > 0 && (
        <div className="bg-gradient-to-r from-holiday-red/10 via-holiday-gold/10 to-holiday-green/10 rounded-xl p-6 border border-holiday-gold/20">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-holiday-gold" />
            <h3 className="text-xl font-bold text-white">Community Favorites</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-holiday-gold fill-holiday-gold" />
                <span className="font-semibold text-white">Highest Rated</span>
              </div>
              <p className="text-holiday-silver text-sm">{filteredProducts[0]?.name}</p>
              <p className="text-holiday-gold font-bold">{filteredProducts[0]?.rating.toFixed(1)}/10</p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ThumbsUp className="w-5 h-5 text-holiday-green" />
                <span className="font-semibold text-white">Most Loved</span>
              </div>
              <p className="text-holiday-silver text-sm">
                {filteredProducts.sort((a, b) => b.reviews - a.reviews)[0]?.name}
              </p>
              <p className="text-holiday-green font-bold">
                {filteredProducts.sort((a, b) => b.reviews - a.reviews)[0]?.reviews.toLocaleString()} reviews
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-holiday-red" />
                <span className="font-semibold text-white">Trending Now</span>
              </div>
              <p className="text-holiday-silver text-sm">
                {filteredProducts.sort((a, b) => 
                  new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
                )[0]?.name}
              </p>
              <p className="text-holiday-red font-bold">Recently added</p>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700/50 text-center">
          <div className="space-y-4">
            <div className="text-6xl">🤝</div>
            <h3 className="text-xl font-semibold text-white">No products match your filters</h3>
            <p className="text-holiday-silver">Try adjusting your criteria to see more community recommendations</p>
            <button
              onClick={() => setFilters({ sortBy: 'rating', category: '', minRating: 11 })}
              className="px-6 py-2 bg-holiday-gold hover:bg-holiday-gold/90 text-gray-900 font-semibold rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityRecommendations;