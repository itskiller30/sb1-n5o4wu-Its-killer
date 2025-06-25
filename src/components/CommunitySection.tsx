import React, { useState } from 'react';
import { Users, Star, Filter, Award, ThumbsUp } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface CommunitySectionProps {
  products: Product[];
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ products }) => {
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'recent'>('rating');
  const [category, setCategory] = useState('');

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products
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

  const avgRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length;
  const totalReviews = products.reduce((sum, p) => sum + p.reviews, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-emerald-500" />
          <h2 className="text-3xl font-bold text-white">Community Picks</h2>
        </div>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Products shared and verified by our community. Every item has been personally tested 
          and recommended by real users who stand behind their choices.
        </p>
      </div>

      {/* Stats */}
      <div className="bg-emerald-900/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">{products.length}</div>
            <div className="text-sm text-slate-300">Community Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{avgRating.toFixed(1)}</div>
            <div className="text-sm text-slate-300">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{totalReviews.toLocaleString()}</div>
            <div className="text-sm text-slate-300">Total Reviews</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <span className="text-slate-300 font-medium">Filter & Sort:</span>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
            <option value="recent">Most Recent</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Product */}
      {filteredProducts.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-900/20 via-slate-800/30 to-teal-900/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Community Favorite</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">{filteredProducts[0].name}</h4>
              <p className="text-slate-300 mb-4">{filteredProducts[0].description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 font-bold">{filteredProducts[0].rating.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">{filteredProducts[0].reviews.toLocaleString()} reviews</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {filteredProducts[0].tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="lg:max-w-sm">
              <ProductCard product={filteredProducts[0]} featured />
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6">
          All Community Recommendations ({filteredProducts.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(1).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;