import React, { useState } from 'react';
import { Plus, Star, X } from 'lucide-react';

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
            className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Star className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">Share Your Favorite</div>
              <div className="text-xs text-emerald-100">Add to community</div>
            </div>
          </button>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
        
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