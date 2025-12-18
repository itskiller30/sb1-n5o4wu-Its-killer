import React, { useState } from 'react';
import { Users, Star, Filter, Award } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface CommunityRecommendationsProps {
  products: Product[];
  isLoading: boolean;
}

interface Filters {
  sortBy: 'rating' | 'reviews' | 'recent';
  category: string;
  minRating: number;
}

const CommunityRecommendations: React.FC<CommunityRecommendationsProps> = ({ products, isLoading }) => {
  const [filters, setFilters] = useState<Filters>({
    sortBy: 'rating',
    category: '',
    minRating: 11
  });

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
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-400">Loading recommendations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl opacity-5">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80"
          alt="Community background"
          className="w-full h-full object-cover blur-md scale-105"
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <h2 className="text-3xl font-bold text-white">Community Picks</h2>
            <p className="text-gray-400">{filteredProducts.length} exceptional products</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-yellow-500">
          <Award className="w-6 h-6" />
          <span className="font-semibold">Avg Rating: {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300 font-medium">Filters:</span>
          </div>
          
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
            <option value="recent">Most Recent</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={filters.minRating}
            onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value={10}>10+ Rating</option>
            <option value={11}>11+ Rating</option>
            <option value={11.5}>11.5+ Rating</option>
            <option value={12}>12+ Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No products match your filters</h3>
          <p className="text-gray-400 mb-4">Try adjusting your criteria to see more recommendations</p>
          <button
            onClick={() => setFilters({ sortBy: 'rating', category: '', minRating: 11 })}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityRecommendations;