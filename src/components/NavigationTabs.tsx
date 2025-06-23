import React from 'react';
import { Search, Users, TrendingUp, Sparkles } from 'lucide-react';

interface NavigationTabsProps {
  activeView: 'search' | 'community';
  onViewChange: (view: 'search' | 'community') => void;
  searchResultsCount: number;
  communityCount: number;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ 
  activeView, 
  onViewChange, 
  searchResultsCount, 
  communityCount 
}) => {
  return (
    <div className="relative mb-8">
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10"></div>
      
      {/* Content */}
      <div className="relative p-2">
        <div className="flex gap-2">
          <button
            onClick={() => onViewChange('search')}
            className={`group relative flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-500 overflow-hidden ${
              activeView === 'search'
                ? 'text-gray-900'
                : 'text-holiday-silver hover:text-white'
            }`}
          >
            {/* Active background */}
            {activeView === 'search' && (
              <div className="absolute inset-0 bg-gradient-to-r from-holiday-gold via-holiday-gold/90 to-holiday-gold/80 rounded-xl"></div>
            )}
            
            {/* Hover background */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative flex items-center justify-center gap-3">
              <Search className="w-5 h-5" />
              <span className="text-lg">Search Results</span>
              {searchResultsCount > 0 && (
                <span className={`px-2 py-1 rounded-full text-sm font-bold ${
                  activeView === 'search' 
                    ? 'bg-gray-900/20 text-gray-900' 
                    : 'bg-holiday-gold/20 text-holiday-gold'
                }`}>
                  {searchResultsCount}
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => onViewChange('community')}
            className={`group relative flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-500 overflow-hidden ${
              activeView === 'community'
                ? 'text-gray-900'
                : 'text-holiday-silver hover:text-white'
            }`}
          >
            {/* Active background */}
            {activeView === 'community' && (
              <div className="absolute inset-0 bg-gradient-to-r from-holiday-green via-holiday-green/90 to-holiday-green/80 rounded-xl"></div>
            )}
            
            {/* Hover background */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative flex items-center justify-center gap-3">
              <Users className="w-5 h-5" />
              <span className="text-lg">Community Picks</span>
              <span className={`px-2 py-1 rounded-full text-sm font-bold ${
                activeView === 'community' 
                  ? 'bg-gray-900/20 text-gray-900' 
                  : 'bg-holiday-green/20 text-holiday-green'
              }`}>
                {communityCount}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;