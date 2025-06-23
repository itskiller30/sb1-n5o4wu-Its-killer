import React from 'react';
import { Filter, SortAsc, Grid, List, Bookmark, Share } from 'lucide-react';

interface QuickActionsProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onFilterToggle: () => void;
  onSortToggle: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  viewMode,
  onViewModeChange,
  onFilterToggle,
  onSortToggle
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-900/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 mb-6">
      <div className="flex items-center gap-2">
        <button
          onClick={onFilterToggle}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-holiday-silver hover:text-white rounded-lg transition-all duration-300"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </button>
        
        <button
          onClick={onSortToggle}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-holiday-silver hover:text-white rounded-lg transition-all duration-300"
        >
          <SortAsc className="w-4 h-4" />
          <span className="text-sm font-medium">Sort</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex bg-gray-800/50 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-holiday-gold text-gray-900'
                : 'text-holiday-silver hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-holiday-gold text-gray-900'
                : 'text-holiday-silver hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;