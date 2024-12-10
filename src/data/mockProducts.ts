import { Product } from '../types';

// Start with existing products
const existingProducts: Product[] = [
  {
    id: '1',
    name: 'Ember Temperature Control Smart Mug 2',
    description: 'Smart mug that maintains your perfect drinking temperature for up to 1.5 hours. Perfect for coffee and tea lovers who enjoy their drinks at the ideal temperature.',
    rating: 11.2,
    reviews: 1250,
    price: 129.95,
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&q=80&w=800',
    category: 'Stocking Stuffers',
    tags: ['Tech', 'Coffee', 'Smart Home'],
    marketplaceLinks: {
      amazon: 'https://amazon.com/dp/B07NQRM6ML'
    },
    status: 'approved',
    submittedAt: '2024-03-16T00:00:00Z',
    approvedAt: '2024-03-16T01:30:00Z'
  }
  // ... other existing products
];

// Add educational toys
const educationalToys: Product[] = [
  {
    id: '60',
    name: 'Magna-Tiles Clear Colors 100 Piece Set',
    description: 'Award-winning magnetic building tiles that develop spatial awareness, math, and architectural skills through creative play.',
    rating: 11.4,
    reviews: 2850,
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
    category: "Kiddo's",
    tags: ['Educational', 'STEM', 'Building'],
    marketplaceLinks: {
      amazon: 'https://amazon.com/dp/B000CBSNRY'
    },
    status: 'approved',
    submittedAt: '2024-03-17T16:00:00Z',
    approvedAt: '2024-03-17T17:30:00Z'
  },
  // ... other educational toys
];

// Combine all products
export const mockProducts: Product[] = [...existingProducts, ...educationalToys];