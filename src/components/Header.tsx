import React from 'react';
import { Zap, Star, Search, Users } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-8">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-black">
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              its
            </span>
            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text">
              Killer
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-2xl text-slate-300 font-light">
          Find the best products. Share your favorites.
        </p>

        {/* Two Main Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Find Products</h3>
            </div>
            <p className="text-slate-400">
              Search across all major retailers for the highest-rated products at the best prices
            </p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">10+ Stores</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Best Prices</span>
            </div>
          </div>

          <div className="bg-emerald-900/20 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-8 h-8 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Share Favorites</h3>
            </div>
            <p className="text-slate-400">
              Share your favorite products with our community and help others discover amazing items
            </p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">Community</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;