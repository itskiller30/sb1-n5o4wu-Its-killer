import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    hmr: {
      clientPort: 443,
      timeout: 120000
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'react-intersection-observer', 'react-hot-toast']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react'],
          utils: ['react-intersection-observer', 'react-hot-toast']
        }
      }
    }
  }
});