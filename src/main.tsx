import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false
    },
  },
});

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-red-900/50 border border-red-500/20 rounded-lg p-6 max-w-lg">
        <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong:</h2>
        <pre className="text-sm text-red-200 bg-black/50 p-4 rounded overflow-auto">
          {error.message}
        </pre>
      </div>
    </div>
  );
}

root.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);