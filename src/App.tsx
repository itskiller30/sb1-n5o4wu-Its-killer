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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

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
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Header />
        
        <div className="mt-12 space-y-8">
          {/* Navigation Tabs */}
          <div className="bg-gradient-to-r from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm rounded-2xl p-2 border border-blue-500/30 shadow-2xl">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('search')}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-500 ${
                  activeTab === 'search'
                    ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                🔍 Search Products
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-500 ${
                  activeTab === 'community'
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                🤝 Community Picks
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
              {/* Community Header */}
              <div className="bg-gradient-to-br from-emerald-900/20 via-slate-800/30 to-teal-900/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 shadow-2xl">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-4">
                    <div className="bg-emerald-500/20 p-4 rounded-full border border-emerald-400/30">
                      <span className="text-4xl">🤝</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white">
                      Community <span className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">Peer-to-Peer</span>
                    </h2>
                    <div className="bg-teal-500/20 p-4 rounded-full border border-teal-400/30">
                      <span className="text-4xl">⭐</span>
                    </div>
                  </div>
                  
                  <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                    Share your most trusted item with our community. One product per person - 
                    the item you'd recommend to your best friend without hesitation.
                  </p>

                  {/* Submission Status */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-emerald-500/20 max-w-2xl mx-auto">
                    {hasSubmitted ? (
                      <div className="text-center space-y-3">
                        <div className="text-6xl">✅</div>
                        <h3 className="text-xl font-bold text-emerald-400">Thank You!</h3>
                        <p className="text-slate-300">
                          Your submission is under review. Our team will verify and publish it soon.
                        </p>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="text-5xl">🎯</div>
                        <h3 className="text-xl font-bold text-white">Share Your Killer Item</h3>
                        <p className="text-slate-300 mb-4">
                          What's the one product you absolutely can't live without?
                        </p>
                        <button
                          onClick={() => setShowSubmission(true)}
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 transform"
                        >
                          Submit Your Trusted Item
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Community Guidelines */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                      <div className="text-2xl mb-2">🔍</div>
                      <h4 className="font-bold text-emerald-400 mb-2">Personal Experience</h4>
                      <p className="text-sm text-slate-300">Only share products you personally own and use regularly</p>
                    </div>
                    <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                      <div className="text-2xl mb-2">💯</div>
                      <h4 className="font-bold text-blue-400 mb-2">Honest Review</h4>
                      <p className="text-sm text-slate-300">Share both pros and cons based on real experience</p>
                    </div>
                    <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                      <div className="text-2xl mb-2">🎯</div>
                      <h4 className="font-bold text-purple-400 mb-2">One Per Person</h4>
                      <p className="text-sm text-slate-300">Choose your absolute favorite - quality over quantity</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Recommendations */}
              <CommunityRecommendations 
                products={mockProducts}
                isLoading={false}
              />
            </div>
          )}
        </div>

        {/* Submission Form Modal */}
        {showSubmission && (
          <SubmissionForm 
            onSubmit={handleSubmission}
            onClose={() => setShowSubmission(false)}
            hasSubmitted={hasSubmitted}
          />
        )}
      </div>

      {/* Floating Action Button - Only show on community tab */}
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