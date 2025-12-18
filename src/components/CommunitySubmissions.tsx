import React, { useState } from 'react';
import { Users, Filter, MessageCircle, ThumbsUp, Clock } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface CommunitySubmissionsProps {
  products: Product[];
}

const CommunitySubmissions: React.FC<CommunitySubmissionsProps> = ({ products }) => {
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'reviews'>('recent');
  const [category, setCategory] = useState('');

  const categories = [...new Set(products.map(p => p.category))];

  const sortedProducts = [...products]
    .filter(product => !category || product.category === category)
    .sort((a, b) => {
      switch (sortBy) {
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

  return (
    <div className="space-y-8 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl opacity-5">
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop&q=80"
          alt="Community background"
          className="w-full h-full object-cover blur-md scale-105"
        />
      </div>

      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl font-bold text-white">Community Verified</h2>
        </div>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Products shared by our trusted community members and verified through real-world testing.
          Each recommendation comes with honest reviews from people who actually use these products.
        </p>
      </div>

      {/* Community Stats */}
      <div className="bg-gradient-to-r from-blue-900/20 via-slate-800/30 to-indigo-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{products.length}</div>
            <div className="text-sm text-slate-300">Community Picks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
            </div>
            <div className="text-sm text-slate-300">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {products.reduce((sum, p) => sum + p.reviews, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-300">Total Reviews</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <span className="text-slate-300 font-medium">Filter & Sort:</span>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          Recent Community Activity
        </h3>
        <div className="space-y-3">
          {sortedProducts.slice(0, 3).map((product, index) => (
            <div key={product.id} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{product.name}</div>
                <div className="text-xs text-slate-400">
                  Shared {new Date(product.submittedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{product.reviews}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{Math.floor(product.reviews * 0.1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">
            All Community Recommendations ({sortedProducts.length})
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitySubmissions;