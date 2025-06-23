import React, { useState, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import SustainabilityMission from './components/SustainabilityMission';
import NavigationTabs from './components/NavigationTabs';
import StatsBar from './components/StatsBar';
import ProductSearch from './components/ProductSearch';
import SearchResults from './components/SearchResults';
import CommunityRecommendations from './components/CommunityRecommendations';
import CommunityHighlight from './components/CommunityHighlight';
import FloatingActionButton from './components/FloatingActionButton';
import SubmissionForm from './components/SubmissionForm';
import AffiliateDisclosure from './components/AffiliateDisclosure';
import RevenueOptimizer from './components/RevenueOptimizer';
import { mockProducts } from './data/mockProducts';
import { SearchResult } from './services/productSearch';
import { Product } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

function AppContent() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmission, setShowSubmission] = useState(false);
  const [activeView, setActiveView] = useState<'search' | 'community'>('community');

  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
    setIsSearching(false);
    if (results.length > 0) {
      setActiveView('search');
    }
  };

  const handleFiltersChange = (filters: any) => {
    setSearchQuery(filters.query);
    if (filters.query && filters.query.length > 2) {
      setIsSearching(true);
    }
  };

  const handleSubmission = (submission: Omit<Product, 'id'>) => {
    console.log('New submission:', submission);
    setShowSubmission(false);
  };

  // Calculate stats
  const stats = {
    totalProducts: mockProducts.length,
    totalUsers: 52000,
    wasteReduced: '$50M+',
    avgRating: mockProducts.reduce((sum, p) => sum + p.rating, 0) / mockProducts.length
  };

  // Enable admin mode for demo
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-holiday-red/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-holiday-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-holiday-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

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
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Header />
        
        {/* Stats Bar */}
        <div className="mt-8">
          <StatsBar 
            totalProducts={stats.totalProducts}
            totalUsers={stats.totalUsers}
            wasteReduced={stats.wasteReduced}
            avgRating={stats.avgRating}
          />
        </div>
        
        {/* Sustainability Mission Section - Only show on community view */}
        {activeView === 'community' && (
          <div className="mt-8">
            <SustainabilityMission />
          </div>
        )}
        
        <div className="mt-8 space-y-8">
          {/* Main Search Interface */}
          <ProductSearch 
            onResults={handleSearchResults}
            onFiltersChange={handleFiltersChange}
          />

          {/* Enhanced Navigation Tabs */}
          <NavigationTabs
            activeView={activeView}
            onViewChange={setActiveView}
            searchResultsCount={searchResults.length}
            communityCount={mockProducts.length}
          />

          {/* Content Area with smooth transitions */}
          <div className="relative min-h-[600px]">
            {activeView === 'search' ? (
              <div className="animate-fade-in">
                <SearchResults 
                  results={searchResults}
                  isLoading={isSearching}
                  query={searchQuery}
                />
              </div>
            ) : (
              <div className="animate-fade-in space-y-8">
                <CommunityHighlight onShare={() => setShowSubmission(true)} />
                <CommunityRecommendations 
                  products={mockProducts}
                  isLoading={false}
                />
              </div>
            )}
          </div>
        </div>

        {showSubmission && (
          <SubmissionForm 
            onSubmit={handleSubmission}
            onClose={() => setShowSubmission(false)}
          />
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onShare={() => setShowSubmission(true)} />

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