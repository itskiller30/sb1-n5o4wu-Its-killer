import React, { useState } from 'react';
import { Plus, Share2, Users, X } from 'lucide-react';

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
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-semibold">Share a Product</span>
          </button>
          
          <button
            onClick={() => setIsExpanded(false)}
            className="group flex items-center gap-3 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Join Community</span>
          </button>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
        
        {/* Icon */}
        <div className="relative">
          {isExpanded ? (
            <X className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <Plus className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
          )}
        </div>
      </button>
    </div>
  );
};

export default FloatingActionButton;