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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #10b981'
          }
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Header />
        
        <div className="mt-12 space-y-12">
          {/* Trust & Mission Section */}
          <TrustBadges />
          
          {/* Enhanced Navigation with itsKiller branding */}
          <div className="flex justify-center">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-3 border border-emerald-500/30 shadow-2xl">
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveView('staff')}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 ${
                    activeView === 'staff'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg border border-emerald-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50 border border-transparent hover:border-emerald-500/30'
                  }`}
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Staff Curated ({staffPicks.length})</span>
                </button>
                <button
                  onClick={() => setActiveView('community')}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 ${
                    activeView === 'community'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border border-blue-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50 border border-transparent hover:border-blue-500/30'
                  }`}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Community Verified ({communitySubmissions.length})</span>
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