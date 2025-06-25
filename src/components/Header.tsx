import React from 'react';
import { Search, Star, Award, TrendingUp, Zap, Crown, Sparkles } from 'lucide-react';

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
                Find the Best Products Everywhere
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-20"></div>
            </div>
          </div>
        </div>

        {/* Search Mission Statement */}
        <div className="bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 max-w-6xl mx-auto shadow-2xl">
          <div className="flex items-center justify-center gap-8 mb-6 flex-wrap">
            <div className="flex items-center gap-3 text-blue-400 group hover:scale-105 transition-transform">
              <div className="bg-blue-500/20 p-2 rounded-full group-hover:bg-blue-500/30 transition-colors">
                <Search className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold">Search All Platforms</span>
            </div>
            <div className="flex items-center gap-3 text-green-400 group hover:scale-105 transition-transform">
              <div className="bg-green-500/20 p-2 rounded-full group-hover:bg-green-500/30 transition-colors">
                <Star className="w-6 h-6 fill-green-400" />
              </div>
              <span className="text-lg font-bold">Top Rated Only</span>
            </div>
            <div className="flex items-center gap-3 text-purple-400 group hover:scale-105 transition-transform">
              <div className="bg-purple-500/20 p-2 rounded-full group-hover:bg-purple-500/30 transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold">Best Prices</span>
            </div>
          </div>
          
          <p className="text-xl text-slate-300 leading-relaxed text-center max-w-4xl mx-auto">
            <strong className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl">itsKiller</strong> searches 
            Amazon, eBay, Walmart, Target, Best Buy, and more to find you the highest-rated products at the best prices. 
            No more endless scrolling—just the cream of the crop.
          </p>
        </div>
      </div>

      {/* Search Features */}
      <div className="relative z-10 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 max-w-7xl mx-auto shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">itsKiller</span> Search?
          </h2>
          <p className="text-slate-300 text-lg max-w-4xl mx-auto">
            Stop wasting time comparing prices and reading fake reviews. We do the heavy lifting for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/30 group-hover:to-blue-600/20 transition-colors border border-blue-400/30">
              <Search className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Multi-Platform Search</h3>
            <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Search 10+ major retailers simultaneously</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-500/30 group-hover:to-green-600/20 transition-colors border border-green-400/30">
              <Star className="w-12 h-12 text-green-400 fill-green-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Quality Filter</h3>
            <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Only shows highly-rated products</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500/30 group-hover:to-purple-600/20 transition-colors border border-purple-400/30">
              <TrendingUp className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Price Comparison</h3>
            <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Automatically finds the best deals</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-yellow-500/30 group-hover:to-orange-500/20 transition-colors border border-yellow-400/30">
              <Zap className="w-12 h-12 text-yellow-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Lightning Fast</h3>
            <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Get results in seconds, not hours</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm px-8 py-4 rounded-full border border-blue-400/30 hover:border-blue-400/50 transition-colors group">
            <Award className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-blue-400 font-bold text-lg">
              Start searching for <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">killer</span> products now
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;