import React, { useState, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInView } from 'react-intersection-observer';
import Header from './components/Header';
import TabBar from './components/TabBar';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import SubmissionForm from './components/SubmissionForm';
import CommunityStats from './components/CommunityStats';
import AffiliateDisclosure from './components/AffiliateDisclosure';
import RevenueOptimizer from './components/RevenueOptimizer';
import useInfiniteProducts from './hooks/useInfiniteProducts';
import { Product, SortOption } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

const TABS = [
  { id: 'community', label: 'Community Picks' },
  { id: 'bifl', label: 'Buy It For Life' },
  { id: 'stocking', label: 'Stocking Stuffers' },
  { id: 'usa', label: 'Made in USA' },
  { id: 'kiddos', label: "Kiddo's" }
];

const CATEGORIES = [
  'Community',
  'Tech Essentials',
  'Home & Kitchen',
  'Outdoor Gear',
  'Office Must-Haves',
  'Travel Accessories',
  'Fitness Equipment',
  'Smart Home',
  'Pet Essentials',
  'Beauty & Wellness'
];

function AppContent() {
  const [activeTab, setActiveTab] = useState('community');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSubmission, setShowSubmission] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const { ref: loadMoreRef, inView } = useInView();

  const {
    allProducts,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteProducts(sortBy, selectedCategory);

  // Fetch more when scrolling near bottom
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const virtualizer = useVirtualizer({
    count: allProducts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 5,
  });

  const handleSubmission = (submission: Omit<Product, 'id'>) => {
    console.log('New submission:', submission);
    setShowSubmission(false);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'community') {
      setSelectedCategory('');
      setSortBy('reviews');
    } else {
      setSelectedCategory(tabId === 'bifl' ? 'Buy It For Life' : 
                        tabId === 'stocking' ? 'Stocking Stuffers' :
                        tabId === 'usa' ? 'Made in USA' :
                        tabId === 'kiddos' ? "Kiddo's" : '');
      setSortBy('rating');
    }
  };

  // Enable admin mode for demo (remove in production)
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        localStorage.setItem('admin_mode', 'true');
        window.location.reload();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            border: '1px solid #374151'
          }
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        
        <div className="mt-12 space-y-8">
          <CommunityStats totalRecommendations={allProducts.length} />
          
          <TabBar 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tabs={TABS}
          />

          <FilterBar
            sortBy={sortBy}
            onSortChange={setSortBy}
            selectedCategory={selectedCategory}
            categories={CATEGORIES}
            onCategoryChange={setSelectedCategory}
          />

          <div className="text-center mb-8">
            <button
              onClick={() => setShowSubmission(true)}
              className="group relative transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-black/90 backdrop-blur-sm hover:bg-black/80 text-white px-8 py-4 rounded-xl border border-white/10 flex items-center gap-3">
                <span className="text-lg font-semibold">Share Your Killer Find</span>
                <span className="text-holiday-gold">→</span>
              </div>
            </button>
          </div>

          <ProductGrid
            parentRef={parentRef}
            virtualItems={virtualizer.getVirtualItems()}
            allItems={allProducts}
            totalItems={allProducts.length}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
          />

          <div ref={loadMoreRef} className="h-4" />
        </div>

        {showSubmission && (
          <SubmissionForm 
            onSubmit={handleSubmission}
            onClose={() => setShowSubmission(false)}
          />
        )}
      </div>

      {/* Affiliate Disclosure */}
      <AffiliateDisclosure />
      
      {/* Revenue Analytics (Admin Only) */}
      <RevenueOptimizer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;