import React from 'react';
import { Zap, Sparkles, Star, Award, Leaf, TrendingDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-holiday-red/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-holiday-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-holiday-green/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Logo Area */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <Zap className="w-20 h-20 text-holiday-gold animate-twinkle" />
            </div>
          </div>

          {/* Title Area */}
          <div className="space-y-6">
            <h1 className="relative">
              <span className="text-8xl font-bold bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green bg-clip-text text-transparent
                             drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] filter">
                itsKiller
              </span>
              <Sparkles className="absolute -right-16 top-0 w-10 h-10 text-holiday-gold animate-pulse" />
            </h1>
            
            <div className="space-y-4">
              <p className="text-3xl text-holiday-silver font-light italic font-serif">
                Only the Best of the Best
              </p>
              
              <div className="flex items-center justify-center gap-8 text-holiday-gold">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-holiday-gold" />
                  <span className="text-lg font-semibold">11+ Rating Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  <span className="text-lg font-semibold">Community Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-holiday-gold/20 max-w-4xl">
            <p className="text-xl text-holiday-silver leading-relaxed mb-4">
              Discover products that exceed expectations. Every item is rated 11+ out of 10 by real users 
              and verified by our community of discerning shoppers across Amazon, eBay, and premium retailers.
            </p>
            
            {/* Sustainability Badge */}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-holiday-green/20">
              <div className="flex items-center gap-2 text-holiday-green">
                <Leaf className="w-5 h-5" />
                <span className="font-semibold">Fighting $1.2T+ Return Crisis</span>
              </div>
              <div className="flex items-center gap-2 text-holiday-green">
                <TrendingDown className="w-5 h-5" />
                <span className="font-semibold">85% Lower Return Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;