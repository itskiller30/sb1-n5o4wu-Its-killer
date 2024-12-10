import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { useVirtualizer } from '@tanstack/react-virtual';

interface ProductGridProps {
  parentRef: React.RefObject<HTMLDivElement>;
  virtualItems: ReturnType<typeof useVirtualizer>['getVirtualItems'];
  allItems: Product[];
  totalItems: number;
  isLoading: boolean;
  hasNextPage: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  parentRef,
  virtualItems,
  allItems,
  totalItems,
  isLoading,
  hasNextPage,
}) => {
  return (
    <>
      <div 
        ref={parentRef}
        className="h-[800px] overflow-auto"
      >
        <div
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          style={{
            height: `${virtualItems[virtualItems.length - 1]?.end ?? 0}px`,
          }}
        >
          {virtualItems.map((virtualRow) => {
            const item = allItems[virtualRow.index];
            
            return (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 w-full"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {item ? (
                  <ProductCard product={item} />
                ) : hasNextPage ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-pulse text-gray-500">Loading more...</div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {allItems.length > 0 && (
        <div className="mt-4 text-center text-gray-400">
          Showing {allItems.length} of {totalItems} products
        </div>
      )}

      {isLoading && (
        <div className="mt-8 flex justify-center">
          <div className="animate-pulse text-gray-500">Loading more products...</div>
        </div>
      )}

      {!hasNextPage && allItems.length > 0 && (
        <div className="mt-8 text-center text-gray-400">
          You've reached the end of the list
        </div>
      )}
    </>
  );
};

export default ProductGrid;