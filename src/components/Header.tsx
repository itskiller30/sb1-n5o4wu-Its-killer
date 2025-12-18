import React from 'react';
import { Search, Star, TrendingUp, Zap, Target } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="space-y-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-orange-500 p-4 rounded-lg">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-white tracking-tight">
            itsKiller
          </h1>
        </div>

        <p className="text-xl text-slate-400 text-center max-w-2xl mx-auto">
          Compare prices across major retailers and find the best deals on top-rated products
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-500/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 border border-blue-500/20">
              <Search className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Multi-Store Search</h3>
            <p className="text-xs text-slate-400">Amazon, eBay, Walmart & more</p>
          </div>

          <div className="text-center">
            <div className="bg-green-500/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 border border-green-500/20">
              <Star className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Quality Verified</h3>
            <p className="text-xs text-slate-400">Only top-rated products</p>
          </div>

          <div className="text-center">
            <div className="bg-orange-500/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 border border-orange-500/20">
              <TrendingUp className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Best Prices</h3>
            <p className="text-xs text-slate-400">Real-time price comparison</p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-500/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 border border-yellow-500/20">
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Instant Results</h3>
            <p className="text-xs text-slate-400">Fast search across platforms</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;