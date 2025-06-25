import React from 'react';
import { Zap, Shield, Award, Users, Leaf, Star, CheckCircle, Heart, Sparkles, Crown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-8 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Logo & Brand */}
      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-center gap-8">
          {/* Animated Logo */}
          <div className="relative group">
            {/* Multiple glow layers for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 rounded-2xl shadow-2xl border border-emerald-400/30 group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-20 h-20 text-white animate-twinkle drop-shadow-lg" />
            </div>
            {/* Floating sparkles */}
            <Sparkles className="absolute -top-3 -right-3 w-10 h-10 text-emerald-400 animate-bounce" />
            <Crown className="absolute -top-2 -left-2 w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          
          {/* Brand Name with Enhanced Typography */}
          <div className="space-y-4">
            <div className="relative">
              {/* Background glow for text */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
              
              {/* Main brand text */}
              <h1 className="relative">
                <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl filter tracking-tight leading-none">
                  its
                </span>
                <span className="text-8xl md:text-9xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl filter tracking-tight leading-none">
                  Killer
                </span>
              </h1>
              
              {/* Animated underline */}
              <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full opacity-60 animate-pulse"></div>
            </div>

            {/* Enhanced tagline */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent flex-1 max-w-20"></div>
              <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text px-6 italic">
                Only the Best of the Best
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent flex-1 max-w-20"></div>
            </div>
          </div>
        </div>

        {/* Brand Promise with itsKiller emphasis */}
        <div className="bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 max-w-6xl mx-auto shadow-2xl">
          <div className="flex items-center justify-center gap-8 mb-6 flex-wrap">
            <div className="flex items-center gap-3 text-emerald-400 group hover:scale-105 transition-transform">
              <div className="bg-emerald-500/20 p-2 rounded-full group-hover:bg-emerald-500/30 transition-colors">
                <Star className="w-6 h-6 fill-emerald-400" />
              </div>
              <span className="text-lg font-bold">11+ Rating Required</span>
            </div>
            <div className="flex items-center gap-3 text-blue-400 group hover:scale-105 transition-transform">
              <div className="bg-blue-500/20 p-2 rounded-full group-hover:bg-blue-500/30 transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold">Community Verified</span>
            </div>
            <div className="flex items-center gap-3 text-green-400 group hover:scale-105 transition-transform">
              <div className="bg-green-500/20 p-2 rounded-full group-hover:bg-green-500/30 transition-colors">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold">Waste Reduction</span>
            </div>
          </div>
          
          <p className="text-xl text-slate-300 leading-relaxed text-center max-w-4xl mx-auto">
            <strong className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-2xl">itsKiller</strong> is where exceptional products meet conscious shopping. 
            Every item is rated 11+ out of 10 by real users and verified by our community of discerning shoppers 
            across Amazon, eBay, and premium retailers.
          </p>
        </div>
      </div>

      {/* What Makes itsKiller Different */}
      <div className="relative z-10 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-7xl mx-auto shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why <span className="text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text">itsKiller</span> is Different
          </h2>
          <p className="text-slate-300 text-lg max-w-4xl mx-auto">
            We're not another algorithm-driven marketplace. <strong className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">itsKiller</strong> is 
            a human-centered community focused on quality, trust, and conscious consumption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-emerald-500/30 group-hover:to-emerald-600/20 transition-colors border border-emerald-400/30">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">100% Human Curated</h3>
            <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">No algorithms, just real people sharing what they actually love</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-yellow-500/30 group-hover:to-orange-500/20 transition-colors border border-yellow-400/30">
              <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">11+ Rating Standard</h3>
            <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Only products that exceed the traditional 10/10 scale</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-red-500/30 group-hover:to-pink-500/20 transition-colors border border-red-400/30">
              <Heart className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Personal Stories</h3>
            <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">Every recommendation comes with real experiences and honest reviews</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-green-500/30 group-hover:to-emerald-500/20 transition-colors border border-green-400/30">
              <Leaf className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Waste Reduction</h3>
            <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">85% lower return rate compared to traditional e-commerce</p>
          </div>
        </div>

        {/* Call to Action with itsKiller branding */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 backdrop-blur-sm px-8 py-4 rounded-full border border-emerald-400/30 hover:border-emerald-400/50 transition-colors group">
            <Shield className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-emerald-400 font-bold text-lg">
              Trusted by 52,000+ <span className="text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text">itsKiller</span> community members
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;