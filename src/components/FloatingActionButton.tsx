import React, { useState } from 'react';
import { Plus, Share2, Users, X, Zap, Crown } from 'lucide-react';

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
            className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 border border-emerald-400/30"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-semibold">Share a Product</span>
          </button>
          
          <button
            onClick={() => setIsExpanded(false)}
            className="group flex items-center gap-3 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300 border border-slate-600/50 hover:border-emerald-500/50"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Join Community</span>
          </button>
        </div>
      )}

      {/* Main FAB with itsKiller branding */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-emerald-400/30"
      >
        {/* Multiple glow effects for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
        
        {/* Icon */}
        <div className="relative">
          {isExpanded ? (
            <X className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <Plus className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
          )}
        </div>
        
        {/* itsKiller brand indicator */}
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-1 border border-yellow-300/50">
          <Zap className="w-3 h-3 text-white" />
        </div>
      </button>
    </div>
  );
};

export default FloatingActionButton;