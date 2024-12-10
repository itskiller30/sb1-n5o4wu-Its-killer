import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/products';
import { SortOption } from '../types';

export const useProducts = (sortBy: SortOption, selectedCategory: string) => {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', sortBy, selectedCategory, page],
    queryFn: () => fetchProducts(selectedCategory, sortBy, page, limit),
    keepPreviousData: true
  });

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return {
    products: data?.products || [],
    total: data?.total || 0,
    hasMore: data ? data.products.length < data.total : false,
    isLoading,
    error,
    loadMore
  };
};