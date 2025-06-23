import React from 'react';
import { Zap, Star, Award, TrendingDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-8">
      {/* Logo */}
      <div className="flex items-center justify-center gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
          <Zap className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          itsKiller
        </h1>
      </div>

      {/* Tagline */}
      <div className="space-y-4">
        <p className="text-2xl text-gray-300 font-light">
          Only the Best of the Best
        </p>
        
        <div className="flex items-center justify-center gap-8 text-blue-400">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-blue-400" />
            <span className="font-semibold">11+ Rating Required</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Community Verified</span>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto border border-gray-700">
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Discover products that exceed expectations. Every item is rated 11+ out of 10 by real users 
          and verified by our community of discerning shoppers.
        </p>
        
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-green-400">
            <TrendingDown className="w-5 h-5" />
            <span className="font-semibold">Fighting $1.2T+ Return Crisis</span>
          </div>
          <div className="text-gray-400">•</div>
          <div className="flex items-center gap-2 text-green-400">
            <span className="font-semibold">85% Lower Return Rate</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;