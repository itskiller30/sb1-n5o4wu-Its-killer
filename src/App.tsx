import React, { useState, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import SustainabilityMission from './components/SustainabilityMission';
import ProductSearch from './components/ProductSearch';
import SearchResults from './components/SearchResults';
import CommunityRecommendations from './components/CommunityRecommendations';
import CommunityHighlight from './components/CommunityHighlight';
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
  const [activeView, setActiveView] = useState<'search' | 'community'>('search');

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
        
        {/* Sustainability Mission Section */}
        <div className="mt-12">
          <SustainabilityMission />
        </div>
        
        <div className="mt-12 space-y-8">
          {/* Main Search Interface */}
          <ProductSearch 
            onResults={handleSearchResults}
            onFiltersChange={handleFiltersChange}
          />

          {/* View Toggle */}
          <div className="flex justify-center">
            <div className="bg-gray-900/50 rounded-xl p-2 border border-gray-700/50">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveView('search')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeView === 'search'
                      ? 'bg-holiday-gold text-gray-900'
                      : 'text-holiday-silver hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  🔍 Search Results {searchResults.length > 0 && `(${searchResults.length})`}
                </button>
                <button
                  onClick={() => setActiveView('community')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeView === 'community'
                      ? 'bg-holiday-gold text-gray-900'
                      : 'text-holiday-silver hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  🤝 Community Picks ({mockProducts.length})
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {activeView === 'search' ? (
            <SearchResults 
              results={searchResults}
              isLoading={isSearching}
              query={searchQuery}
            />
          ) : (
            <>
              <CommunityHighlight onShare={() => setShowSubmission(true)} />
              <CommunityRecommendations 
                products={mockProducts}
                isLoading={false}
              />
            </>
          )}

          {/* Call to Action - Only show in search view */}
          {activeView === 'search' && (
            <div className="text-center">
              <div className="bg-gradient-to-br from-holiday-pine to-gray-900 rounded-2xl p-8 border border-holiday-gold/20">
                <h3 className="text-2xl font-bold text-holiday-snow mb-4">
                  Found an Amazing Product?
                </h3>
                <p className="text-holiday-silver mb-6 max-w-2xl mx-auto">
                  Share your killer finds with our community! Help others discover products 
                  that exceed expectations and join our mission to reduce wasteful returns.
                </p>
                <button
                  onClick={() => setShowSubmission(true)}
                  className="group relative transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative bg-black/90 backdrop-blur-sm hover:bg-black/80 text-white px-8 py-4 rounded-xl border border-white/10 flex items-center gap-3">
                    <span className="text-lg font-semibold">Share Your Discovery</span>
                    <span className="text-holiday-gold">→</span>
                  </div>
                </button>
              </div>
            </div>
          )}
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