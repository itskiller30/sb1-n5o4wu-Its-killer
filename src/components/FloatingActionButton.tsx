import React, { useState } from 'react';
import { Plus, Share2, Users, X, Zap, Crown, Star, ShoppingCart } from 'lucide-react';

interface FloatingActionButtonProps {
  onShare: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onShare }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Expanded menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-fade-in">
          <button
            onClick={() => {
              onShare();
              setIsExpanded(false);
            }}
            className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 border border-emerald-400/30"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <Star className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Add Your Killer Item</div>
              <div className="text-xs text-emerald-100">Share your favorite product</div>
            </div>
          </button>
          
          <button
            onClick={() => setIsExpanded(false)}
            className="group flex items-center gap-3 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-6 py-4 rounded-xl shadow-lg transition-all duration-300 border border-slate-600/50 hover:border-emerald-500/50"
          >
            <div className="bg-slate-600/50 p-2 rounded-full">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-bold">Browse Community</div>
              <div className="text-xs text-slate-400">See what others recommend</div>
            </div>
          </button>
        </div>
      )}

      {/* Main FAB with enhanced itsKiller branding */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white p-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-emerald-400/30"
      >
        {/* Multiple glow effects for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
        
        {/* Icon */}
        <div className="relative">
          {isExpanded ? (
            <X className="w-7 h-7 transition-transform duration-300" />
          ) : (
            <Plus className="w-7 h-7 transition-transform duration-300 group-hover:rotate-90" />
          )}
        </div>
        
        {/* itsKiller brand indicators */}
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-1.5 border border-yellow-300/50">
          <Zap className="w-4 h-4 text-white" />
        </div>
        
        <div className="absolute -bottom-1 -left-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 border border-purple-300/50">
          <Crown className="w-3 h-3 text-white" />
        </div>
      </button>

      {/* Pulsing ring effect */}
      <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping"></div>
    </div>
  );
};

export default FloatingActionButton;