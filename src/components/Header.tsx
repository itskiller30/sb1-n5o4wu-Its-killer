import React from 'react';
import { Zap, Shield, Award, Users, Leaf, Star, CheckCircle, Heart, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-8">
      {/* Logo & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-6">
          <div className="relative group">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-holiday-red via-holiday-gold to-holiday-green p-6 rounded-2xl shadow-2xl">
              <Zap className="w-16 h-16 text-white animate-twinkle" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-holiday-gold animate-bounce" />
          </div>
          
          <div className="space-y-2">
            <h1 className="relative">
              <span className="text-7xl md:text-8xl font-black bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green bg-clip-text text-transparent drop-shadow-2xl filter tracking-tight">
                itsKiller
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green rounded-lg blur opacity-20 animate-pulse"></div>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px bg-gradient-to-r from-transparent via-holiday-gold to-transparent flex-1"></div>
              <p className="text-holiday-silver text-xl font-light italic px-4">Only the Best of the Best</p>
              <div className="h-px bg-gradient-to-r from-transparent via-holiday-gold to-transparent flex-1"></div>
            </div>
          </div>
        </div>

        {/* Brand Promise */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-holiday-gold/20 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="flex items-center gap-2 text-holiday-gold">
              <Star className="w-6 h-6 fill-holiday-gold" />
              <span className="text-lg font-bold">11+ Rating Required</span>
            </div>
            <div className="flex items-center gap-2 text-holiday-gold">
              <Award className="w-6 h-6" />
              <span className="text-lg font-bold">Community Verified</span>
            </div>
            <div className="flex items-center gap-2 text-holiday-green">
              <Leaf className="w-6 h-6" />
              <span className="text-lg font-bold">Waste Reduction</span>
            </div>
          </div>
          
          <p className="text-xl text-holiday-silver leading-relaxed text-center">
            <strong className="text-holiday-gold">itsKiller</strong> is where exceptional products meet conscious shopping. 
            Every item is rated 11+ out of 10 by real users and verified by our community of discerning shoppers 
            across Amazon, eBay, and premium retailers.
          </p>
        </div>
      </div>

      {/* What Makes itsKiller Different */}
      <div className="bg-gradient-to-r from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-holiday-gold/20 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why <span className="text-holiday-gold">itsKiller</span> is Different
          </h2>
          <p className="text-holiday-silver text-lg max-w-3xl mx-auto">
            We're not another algorithm-driven marketplace. <strong className="text-holiday-gold">itsKiller</strong> is 
            a human-centered community focused on quality, trust, and conscious consumption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-holiday-green/20 to-holiday-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-holiday-green/30">
              <CheckCircle className="w-10 h-10 text-holiday-green" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Human Curated</h3>
            <p className="text-holiday-silver text-sm">No algorithms, just real people sharing what they actually love</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-holiday-gold/20 to-holiday-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-holiday-gold/30">
              <Star className="w-10 h-10 text-holiday-gold fill-holiday-gold" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">11+ Rating Standard</h3>
            <p className="text-holiday-silver text-sm">Only products that exceed the traditional 10/10 scale</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-holiday-red/20 to-holiday-red/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-holiday-red/30">
              <Heart className="w-10 h-10 text-holiday-red" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Personal Stories</h3>
            <p className="text-holiday-silver text-sm">Every recommendation comes with real experiences and honest reviews</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-holiday-green/20 to-holiday-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-holiday-green/30">
              <Leaf className="w-10 h-10 text-holiday-green" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Waste Reduction</h3>
            <p className="text-holiday-silver text-sm">85% lower return rate compared to traditional e-commerce</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-holiday-gold/20 to-holiday-green/20 backdrop-blur-sm px-8 py-4 rounded-full border border-holiday-gold/30">
            <Shield className="w-6 h-6 text-holiday-gold" />
            <span className="text-holiday-gold font-bold text-lg">
              Trusted by 52,000+ <span className="text-holiday-green">itsKiller</span> community members
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;