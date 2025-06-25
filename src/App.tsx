import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import ProductSearch from './components/ProductSearch';
import SearchResults from './components/SearchResults';
import SubmissionForm from './components/SubmissionForm';
import { SearchResult } from './services/productSearch';
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
  const [showSubmission, setShowSubmission] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
    setIsSearching(false);
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
        
        <div className="mt-12 space-y-12">
          {/* Two Main Action Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Find Killer Products Card */}
            <div className="bg-gradient-to-br from-blue-900/20 via-slate-800/30 to-indigo-900/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 shadow-2xl group hover:scale-[1.02] transition-all duration-300">
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-blue-400/30">
                  <span className="text-5xl">🔍</span>
                </div>
                
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Find <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">Killer</span> Products
                  </h2>
                  <p className="text-xl text-slate-300 leading-relaxed">
                    Search across all major retailers to find the highest-rated products at the best prices. 
                    We compare Amazon, eBay, Walmart, Target, Best Buy, and more.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                    <div className="text-blue-400 font-bold">10+ Retailers</div>
                    <div className="text-slate-400">Price comparison</div>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <div className="text-green-400 font-bold">Top Rated Only</div>
                    <div className="text-slate-400">Quality guaranteed</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                    <div className="text-purple-400 font-bold">Best Prices</div>
                    <div className="text-slate-400">Automatic deals</div>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                    <div className="text-yellow-400 font-bold">Lightning Fast</div>
                    <div className="text-slate-400">Instant results</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Killer Products Card */}
            <div className="bg-gradient-to-br from-emerald-900/20 via-slate-800/30 to-teal-900/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 shadow-2xl group hover:scale-[1.02] transition-all duration-300">
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-emerald-400/30">
                  <span className="text-5xl">⭐</span>
                </div>
                
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Submit <span className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">Killer</span> Products
                  </h2>
                  <p className="text-xl text-slate-300 leading-relaxed">
                    Share your favorite product with our community. The one item you'd recommend 
                    to your best friend without hesitation.
                  </p>
                </div>

                {hasSubmitted ? (
                  <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/20">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-2">Thank You!</h3>
                    <p className="text-slate-300">
                      Your submission is under review. We'll publish it soon!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                        <div className="text-emerald-400 font-bold">Smart Search</div>
                        <div className="text-slate-400">Auto price finder</div>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                        <div className="text-blue-400 font-bold">Affiliate Links</div>
                        <div className="text-slate-400">Auto-generated</div>
                      </div>
                      <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                        <div className="text-purple-400 font-bold">One Per Person</div>
                        <div className="text-slate-400">Quality focus</div>
                      </div>
                      <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold">Community</div>
                        <div className="text-slate-400">Peer reviewed</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowSubmission(true)}
                      className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 transform text-xl"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">⭐</span>
                        <span>Add Your Killer Item</span>
                        <span className="text-2xl">🎯</span>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Search Interface */}
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

        {/* Enhanced Submission Form Modal */}
        {showSubmission && (
          <SubmissionForm 
            onSubmit={handleSubmission}
            onClose={() => setShowSubmission(false)}
            hasSubmitted={hasSubmitted}
          />
        )}
      </div>
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