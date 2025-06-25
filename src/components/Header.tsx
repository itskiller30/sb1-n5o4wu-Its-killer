import React from 'react';
import { Search, Star, Award, TrendingUp, Zap, Crown, Sparkles, Target, Users } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-8 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Logo & Brand */}
      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-center gap-8">
          {/* Animated Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 rounded-2xl shadow-2xl border border-blue-400/30 group-hover:scale-105 transition-transform duration-300">
              <Search className="w-20 h-20 text-white animate-twinkle drop-shadow-lg" />
            </div>
            <Sparkles className="absolute -top-3 -right-3 w-10 h-10 text-blue-400 animate-bounce" />
            <Crown className="absolute -top-2 -left-2 w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          
          {/* Brand Name */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
              
              <h1 className="relative">
                <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl filter tracking-tight leading-none">
                  its
                </span>
                <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl filter tracking-tight leading-none">
                  Killer
                </span>
              </h1>
              
              <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"></div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-20"></div>
              <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text px-6 italic">
                Two Simple Options
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-20"></div>
            </div>
          </div>
        </div>

        {/* Two Main Options */}
        <div className="bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 max-w-6xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Option 1: Find Products */}
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/30 group-hover:to-blue-600/20 transition-colors border border-blue-400/30">
                <Search className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                🔍 Find Killer Products
              </h3>
              <p className="text-slate-400 text-lg group-hover:text-slate-300 transition-colors leading-relaxed">
                Search across all major retailers for the highest-rated products at the best prices
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">10+ Retailers</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">Best Prices</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">Top Rated</span>
              </div>
            </div>
            
            {/* Option 2: Submit Products */}
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-emerald-500/30 group-hover:to-emerald-600/20 transition-colors border border-emerald-400/30">
                <Star className="w-10 h-10 text-emerald-400 fill-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                ⭐ Submit Killer Products
              </h3>
              <p className="text-slate-400 text-lg group-hover:text-slate-300 transition-colors leading-relaxed">
                Share your favorite product with our community and help others discover amazing items
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30">Auto Search</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">Affiliate Links</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">Community</span>
              </div>
            </div>
          </div>

          {/* Enhanced Value Proposition */}
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">itsKiller</span>?
              </h2>
              <p className="text-slate-300 text-lg max-w-4xl mx-auto mb-6">
                Stop wasting time comparing prices and reading fake reviews. We do the heavy lifting for you.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-colors group">
                  <Target className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-bold text-blue-400">Multi-Platform</div>
                  <div className="text-xs text-slate-400">Search everywhere</div>
                </div>
                <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20 hover:border-emerald-400/40 transition-colors group">
                  <Award className="w-8 h-8 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-bold text-emerald-400">Quality First</div>
                  <div className="text-xs text-slate-400">Only the best</div>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20 hover:border-purple-400/40 transition-colors group">
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-bold text-purple-400">Best Prices</div>
                  <div className="text-xs text-slate-400">Auto comparison</div>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20 hover:border-yellow-400/40 transition-colors group">
                  <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-bold text-yellow-400">Community</div>
                  <div className="text-xs text-slate-400">Real reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;