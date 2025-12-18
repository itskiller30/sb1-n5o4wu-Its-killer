import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import ProductSearch from './components/ProductSearch';
import SearchResults from './components/SearchResults';
import CommunityRecommendations from './components/CommunityRecommendations';
import SubmissionForm from './components/SubmissionForm';
import FloatingActionButton from './components/FloatingActionButton';
import { SearchResult } from './services/productSearch';
import { mockProducts } from './data/mockProducts';
import { Product } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

function AppContent() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'community'>('search');
  const [showSubmission, setShowSubmission] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
    setIsSearching(false);
    if (results.length > 0) {
      setActiveTab('search');
    }
  };

  const handleFiltersChange = (filters: any) => {
    setSearchQuery(filters.query);
    if (filters.query && filters.query.length > 2) {
      setIsSearching(true);
    }
  };

  const handleSubmission = (submission: Omit<Product, 'id'>) => {
    console.log('New community submission:', submission);
    setHasSubmitted(true);
    setShowSubmission(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #475569'
          }
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />

        <div className="mt-12 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 max-w-md mx-auto">
            <div className="flex gap-1.5">
              <button
                onClick={() => setActiveTab('search')}
                className={`flex-1 py-3 px-6 rounded-md font-semibold text-sm transition-all ${
                  activeTab === 'search'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Search Products
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`flex-1 py-3 px-6 rounded-md font-semibold text-sm transition-all ${
                  activeTab === 'community'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Community Picks
              </button>
            </div>
          </div>

          {/* Content Area */}
          {activeTab === 'search' ? (
            <div className="space-y-8">
              {/* Main Search Interface */}
              <ProductSearch 
                onResults={handleSearchResults}
                onFiltersChange={handleFiltersChange}
              />

              {/* Search Results */}
              <SearchResults 
                results={searchResults}
                isLoading={isSearching}
                query={searchQuery}
              />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 max-w-4xl mx-auto">
                <div className="text-center space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    Share Your Favorite Product
                  </h2>

                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Recommend one product you personally use and love. Help others discover great items.
                  </p>

                  {hasSubmitted ? (
                    <div className="text-center space-y-4 py-8">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                        <Star className="w-8 h-8 text-green-400 fill-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                      <p className="text-slate-400">
                        Your submission is under review. We'll publish it after verification.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <button
                        onClick={() => setShowSubmission(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                      >
                        Submit Your Product
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <h4 className="font-semibold text-white mb-2">Personal Experience</h4>
                          <p className="text-sm text-slate-400">Only share products you personally own and use</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <h4 className="font-semibold text-white mb-2">Honest Review</h4>
                          <p className="text-sm text-slate-400">Share your genuine experience with the product</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <h4 className="font-semibold text-white mb-2">One Per Person</h4>
                          <p className="text-sm text-slate-400">Choose your absolute favorite product</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <CommunityRecommendations
                products={mockProducts}
                isLoading={false}
              />
            </div>
          )}
        </div>

        {/* Enhanced Submission Form Modal */}
        {showSubmission && (
          <SubmissionForm 
            onSubmit={handleSubmission}
            onClose={() => setShowSubmission(false)}
            hasSubmitted={hasSubmitted}
          />
        )}
      </div>

      {/* Enhanced Floating Action Button - Only show on community tab */}
      {activeTab === 'community' && !hasSubmitted && (
        <FloatingActionButton onShare={() => setShowSubmission(true)} />
      )}
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