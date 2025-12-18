import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onShare: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onShare }) => {
  return (
    <div className="fixed bottom-8 right-8 z-40">
      <button
        onClick={onShare}
        className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingActionButton;