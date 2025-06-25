import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import StaffPicks from './components/StaffPicks';
import CommunitySubmissions from './components/CommunitySubmissions';
import SubmissionForm from './components/SubmissionForm';
import TrustBadges from './components/TrustBadges';
import FloatingActionButton from './components/FloatingActionButton';
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
  const [showSubmission, setShowSubmission] = useState(false);
  const [activeView, setActiveView] = useState<'staff' | 'community'>('staff');

  const handleSubmission = (submission: Omit<Product, 'id'>) => {
    console.log('New community submission:', submission);
    setShowSubmission(false);
  };

  // Split products into staff picks and community submissions
  const staffPicks = mockProducts.filter(p => p.status === 'approved').slice(0, 8);
  const communitySubmissions = mockProducts.filter(p => p.status === 'approved').slice(8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155'
          }
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />
        
        <div className="mt-12 space-y-12">
          {/* Trust & Mission Section */}
          <TrustBadges />
          
          {/* Navigation */}
          <div className="flex justify-center">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveView('staff')}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeView === 'staff'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  Staff Curated ({staffPicks.length})
                </button>
                <button
                  onClick={() => setActiveView('community')}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeView === 'community'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  Community Verified ({communitySubmissions.length})
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {activeView === 'staff' ? (
            <StaffPicks products={staffPicks} />
          ) : (
            <CommunitySubmissions products={communitySubmissions} />
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