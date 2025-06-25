import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import ProductSearch from './components/ProductSearch';
import SearchResults from './components/SearchResults';
import CommunitySection from './components/CommunitySection';
import SubmissionForm from './components/SubmissionForm';
import FloatingActionButton from './components/FloatingActionButton';
import { SearchResult } from './services/productSearch';
import { Product } from './types';
import { mockProducts } from './data/mockProducts';

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
  const [showSubmission, setShowSubmission] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'community'>('search');

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
    console.log('New submission:', submission);
    setShowSubmission(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #3b82f6'
          }
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        
        <div className="mt-12 space-y-12">
          {/* Navigation Tabs */}
          <div className="flex justify-center">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 border border-slate-700">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('search')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'search'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  🔍 Find Products
                </button>
                <button
                  onClick={() => setActiveTab('community')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'community'
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  ⭐ Community Picks ({mockProducts.length})
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {activeTab === 'search' ? (
            <div className="space-y-8">
              <ProductSearch 
                onResults={handleSearchResults}
                onFiltersChange={handleFiltersChange}
              />
              <SearchResults 
                results={searchResults}
                isLoading={isSearching}
                query={searchQuery}
              />
            </div>
          ) : (
            <CommunitySection products={mockProducts} />
          )}
        </div>

        {showSubmission && (
          <SubmissionForm 
            onSubmit={handleSubmission}
            onClose={() => setShowSubmission(false)}
          />
        )}
      </div>

      <FloatingActionButton onShare={() => setShowSubmission(true)} />
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