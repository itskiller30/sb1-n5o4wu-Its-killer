import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onShare: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onShare }) => {
  return (
    <button
      onClick={onShare}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-40"
      aria-label="Share Product"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};

export default FloatingActionButton;