import React, { useState } from 'react';
import { Plus, Share2, Sparkles, X } from 'lucide-react';

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
            className="group flex items-center gap-3 bg-holiday-green hover:bg-holiday-green/90 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-semibold">Share Product</span>
          </button>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative bg-gradient-to-r from-holiday-gold via-holiday-gold/90 to-holiday-gold/80 hover:from-holiday-gold/90 hover:to-holiday-gold text-gray-900 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-holiday-gold to-holiday-gold/80 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
        
        {/* Icon */}
        <div className="relative">
          {isExpanded ? (
            <X className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <Plus className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
          )}
        </div>
        
        {/* Sparkle effect */}
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-holiday-gold animate-twinkle" />
      </button>
    </div>
  );
};

export default FloatingActionButton;