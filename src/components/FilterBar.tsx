import React from 'react';
import { SortOption } from '../types';
import { SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  onSortChange,
  selectedCategory,
  categories,
  onCategoryChange,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-4 mb-6 border border-gray-800">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-white">Filters</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="rating">Highest Rated</option>
            <option value="price">Price: Low to High</option>
            <option value="reviews">Most Reviewed</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;