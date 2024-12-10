import { useInfiniteQuery } from '@tanstack/react-query';
import { Product, SortOption } from '../types';
import { mockProducts } from '../data/mockProducts';

const ITEMS_PER_PAGE = 20;

const fetchProductPage = async (
  page: number,
  sortBy: SortOption,
  selectedCategory: string
): Promise<{ products: Product[]; nextPage: number | null }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let products = [...mockProducts];

  // Filter by category
  if (selectedCategory) {
    if (selectedCategory === 'Community') {
      products = products.sort((a, b) => b.reviews - a.reviews);
    } else {
      products = products.filter((p) => p.category === selectedCategory);
    }
  }

  // Sort products
  products = products.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.price - b.price;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  // Paginate
  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageProducts = products.slice(start, end);
  const hasNextPage = end < products.length;

  return {
    products: pageProducts,
    nextPage: hasNextPage ? page + 1 : null
  };
};

export const useInfiniteProducts = (sortBy: SortOption, selectedCategory: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', sortBy, selectedCategory],
    queryFn: ({ pageParam = 0 }) => fetchProductPage(pageParam, sortBy, selectedCategory),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0
  });

  const allProducts = data?.pages.flatMap(page => page.products) ?? [];

  return {
    allProducts,
    hasNextPage: !!hasNextPage,
    isLoading: isFetching && !isFetchingNextPage,
    isFetchingNextPage,
    fetchNextPage
  };
};

export default useInfiniteProducts;