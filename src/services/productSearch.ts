import { toast } from 'react-hot-toast';

export interface SearchResult {
  title: string;
  price: number;
  url: string;
  image?: string;
  marketplace: string;
  rating?: number;
  reviews?: number;
  category?: string;
  inStock?: boolean;
  shippingInfo?: string;
}

const MARKETPLACES = [
  'Amazon', 'eBay', 'Walmart', 'Target', 'Best Buy',
  'Home Depot', 'Costco', 'Newegg', 'B&H Photo', 'Etsy'
] as const;

export type Marketplace = typeof MARKETPLACES[number];

// Sample product data for different search terms
const SAMPLE_PRODUCTS: Record<string, Partial<SearchResult>[]> = {
  'headphones': [
    { title: 'Sony WH-1000XM4 Wireless Headphones', price: 279.99, rating: 4.5, reviews: 15420 },
    { title: 'Bose QuietComfort 45 Headphones', price: 329.00, rating: 4.4, reviews: 8930 },
    { title: 'Apple AirPods Pro (2nd Gen)', price: 249.00, rating: 4.6, reviews: 24567 },
    { title: 'Sennheiser HD 660S Headphones', price: 499.95, rating: 4.7, reviews: 3420 }
  ],
  'laptop': [
    { title: 'MacBook Air M2 13-inch', price: 1199.00, rating: 4.8, reviews: 12450 },
    { title: 'Dell XPS 13 Plus Laptop', price: 1299.99, rating: 4.3, reviews: 5670 },
    { title: 'HP Spectre x360 14-inch', price: 1149.99, rating: 4.4, reviews: 3890 },
    { title: 'Lenovo ThinkPad X1 Carbon', price: 1599.00, rating: 4.5, reviews: 7230 }
  ],
  'phone': [
    { title: 'iPhone 15 Pro Max 256GB', price: 1199.00, rating: 4.7, reviews: 18920 },
    { title: 'Samsung Galaxy S24 Ultra', price: 1299.99, rating: 4.6, reviews: 14560 },
    { title: 'Google Pixel 8 Pro', price: 999.00, rating: 4.5, reviews: 8740 },
    { title: 'OnePlus 12 5G Smartphone', price: 799.99, rating: 4.4, reviews: 5230 }
  ],
  'coffee': [
    { title: 'Breville Barista Express Espresso Machine', price: 699.95, rating: 4.4, reviews: 8920 },
    { title: 'Keurig K-Elite Coffee Maker', price: 169.99, rating: 4.3, reviews: 15670 },
    { title: 'Chemex Classic Pour-over Glass Coffeemaker', price: 44.95, rating: 4.6, reviews: 3450 },
    { title: 'Ninja Specialty Coffee Maker', price: 179.99, rating: 4.2, reviews: 7890 }
  ],
  'kitchen': [
    { title: 'KitchenAid Stand Mixer Artisan Series', price: 379.99, rating: 4.7, reviews: 12340 },
    { title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker', price: 99.95, rating: 4.6, reviews: 87654 },
    { title: 'Vitamix A3500 Ascent Series Blender', price: 549.95, rating: 4.5, reviews: 6789 },
    { title: 'Cuisinart Food Processor 14-Cup', price: 199.95, rating: 4.4, reviews: 9870 }
  ],
  'fitness': [
    { title: 'Peloton Bike+ Home Fitness Bike', price: 2495.00, rating: 4.4, reviews: 5670 },
    { title: 'Bowflex SelectTech 552 Adjustable Dumbbells', price: 399.00, rating: 4.6, reviews: 8920 },
    { title: 'NordicTrack Commercial 1750 Treadmill', price: 1999.00, rating: 4.3, reviews: 3450 },
    { title: 'Theragun PRO Percussive Therapy Device', price: 599.00, rating: 4.5, reviews: 7890 }
  ]
};

// Enhanced search simulation with more realistic data
const searchMarketplace = async (query: string, marketplace: Marketplace): Promise<SearchResult[]> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));

  // Find matching products based on query
  const queryLower = query.toLowerCase();
  let matchingProducts: Partial<SearchResult>[] = [];

  // Check for exact matches in sample data
  for (const [category, products] of Object.entries(SAMPLE_PRODUCTS)) {
    if (queryLower.includes(category) || category.includes(queryLower)) {
      matchingProducts = [...matchingProducts, ...products];
    }
  }

  // If no exact matches, search through all products
  if (matchingProducts.length === 0) {
    const allProducts = Object.values(SAMPLE_PRODUCTS).flat();
    matchingProducts = allProducts.filter(product => 
      product.title?.toLowerCase().includes(queryLower) ||
      queryLower.split(' ').some(word => product.title?.toLowerCase().includes(word))
    );
  }

  // If still no matches, generate generic results
  if (matchingProducts.length === 0) {
    matchingProducts = [
      { title: `${query} - Premium Model`, price: 199.99, rating: 4.3, reviews: 1250 },
      { title: `${query} - Professional Grade`, price: 299.99, rating: 4.5, reviews: 890 },
      { title: `${query} - Budget Option`, price: 89.99, rating: 4.1, reviews: 2340 }
    ];
  }

  // Generate marketplace-specific pricing and details
  const basePrice = matchingProducts[0]?.price || 100;
  const marketplacePricing: Record<string, number> = {
    'Amazon': basePrice * (0.9 + Math.random() * 0.2),
    'eBay': basePrice * (0.8 + Math.random() * 0.3),
    'Walmart': basePrice * (0.85 + Math.random() * 0.25),
    'Target': basePrice * (0.9 + Math.random() * 0.2),
    'Best Buy': basePrice * (0.95 + Math.random() * 0.15),
    'Home Depot': basePrice * (0.9 + Math.random() * 0.2),
    'Costco': basePrice * (0.85 + Math.random() * 0.2),
    'Newegg': basePrice * (0.9 + Math.random() * 0.2),
    'B&H Photo': basePrice * (0.95 + Math.random() * 0.15),
    'Etsy': basePrice * (1.1 + Math.random() * 0.3)
  };

  // Select 1-2 products from matching products for this marketplace
  const numResults = Math.min(matchingProducts.length, Math.floor(Math.random() * 2) + 1);
  const selectedProducts = matchingProducts.slice(0, numResults);

  return selectedProducts.map((product, index) => {
    const variation = 0.9 + Math.random() * 0.2;
    const price = Math.round((marketplacePricing[marketplace] || basePrice) * variation * 100) / 100;
    
    return {
      title: product.title || `${query} - ${marketplace} Option ${index + 1}`,
      price,
      url: `https://${marketplace.toLowerCase().replace(/\s+/g, '')}.com/product/${Math.random().toString(36).substring(7)}`,
      image: getProductImage(query),
      marketplace,
      rating: product.rating || (3.5 + Math.random() * 1.5),
      reviews: product.reviews || Math.floor(Math.random() * 5000) + 100,
      category: inferCategory(query),
      inStock: Math.random() > 0.1, // 90% in stock
      shippingInfo: getShippingInfo(marketplace)
    };
  });
};

const getProductImage = (query: string): string => {
  const imageCategories: Record<string, string> = {
    'headphones': 'photo-1505740420928-5e560c06d30e',
    'laptop': 'photo-1496181133206-80ce9b88a853',
    'phone': 'photo-1511707171634-5f897ff02aa9',
    'camera': 'photo-1502920917128-1aa500764cbd',
    'watch': 'photo-1523275335684-37898b6baf30',
    'shoes': 'photo-1549298916-b41d501d3772',
    'coffee': 'photo-1544787219-7f47ccb76574',
    'kitchen': 'photo-1556909114-f6e7ad7d3136',
    'fitness': 'photo-1571019613454-1cb2f99b2d8b',
    'book': 'photo-1481627834876-b7833e8f5570'
  };

  const category = Object.keys(imageCategories).find(cat => 
    query.toLowerCase().includes(cat)
  ) || 'generic';

  const imageId = imageCategories[category] || 'photo-1553062407-98eeb64c6a62';
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&q=80&w=400`;
};

const inferCategory = (query: string): string => {
  const categories: Record<string, string> = {
    'phone|mobile|smartphone': 'Electronics',
    'laptop|computer|pc': 'Electronics',
    'headphones|earbuds|audio': 'Electronics',
    'camera|photography': 'Electronics',
    'kitchen|cooking|appliance': 'Home & Kitchen',
    'fitness|exercise|gym': 'Sports & Outdoors',
    'book|reading': 'Books',
    'clothing|shirt|pants|shoes': 'Clothing',
    'car|automotive|vehicle': 'Automotive',
    'tool|hardware': 'Tools & Home Improvement'
  };

  for (const [keywords, category] of Object.entries(categories)) {
    if (new RegExp(keywords, 'i').test(query)) {
      return category;
    }
  }

  return 'General';
};

const getShippingInfo = (marketplace: string): string => {
  const shippingOptions: Record<string, string[]> = {
    'Amazon': ['Free shipping with Prime', '2-day delivery', 'Same-day in select areas'],
    'eBay': ['Varies by seller', 'Free shipping available', 'Fast & Free program'],
    'Walmart': ['Free 2-day shipping $35+', 'Pickup available', 'Same-day delivery'],
    'Target': ['Free shipping $35+', 'Same-day delivery', 'Drive up available'],
    'Best Buy': ['Free shipping $35+', 'Store pickup', 'Geek Squad installation'],
    'Home Depot': ['Free shipping $45+', 'Store pickup', 'Truck delivery available'],
    'Costco': ['Free shipping for members', 'White glove delivery', '2-day delivery'],
    'Newegg': ['Free shipping available', 'Newegg Premier', 'Express shipping'],
    'B&H Photo': ['Free expedited shipping', 'Professional support', 'B&H Payboo Card'],
    'Etsy': ['Varies by seller', 'Handmade items', 'Custom shipping options']
  };

  const options = shippingOptions[marketplace] || ['Standard shipping'];
  return options[Math.floor(Math.random() * options.length)];
};

export const searchProducts = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.length < 2) {
    toast.error('Please enter at least 2 characters to search');
    return [];
  }

  try {
    // Search all marketplaces in parallel
    const searchPromises = MARKETPLACES.map(marketplace => 
      searchMarketplace(query, marketplace)
        .catch((error) => {
          console.warn(`Search failed for ${marketplace}:`, error);
          return [] as SearchResult[];
        })
    );

    const results = await Promise.all(searchPromises);
    const flatResults = results.flat();

    // Remove duplicates and sort by relevance/price
    const uniqueResults = flatResults.filter((result, index, self) => 
      index === self.findIndex(r => r.title === result.title && r.marketplace === result.marketplace)
    );

    // Sort by a combination of rating, reviews, and price
    const sortedResults = uniqueResults.sort((a, b) => {
      const scoreA = (a.rating || 0) * Math.log(a.reviews || 1) / a.price;
      const scoreB = (b.rating || 0) * Math.log(b.reviews || 1) / b.price;
      return scoreB - scoreA;
    });

    // Limit to top 20 results for better performance
    return sortedResults.slice(0, 20);
  } catch (error) {
    console.error('Search failed:', error);
    toast.error('Search failed. Please try again.');
    return [];
  }
};

// Advanced search with filters
export const searchProductsAdvanced = async (
  query: string,
  filters: {
    category?: string;
    priceRange?: [number, number];
    rating?: number;
    marketplace?: string;
    sortBy?: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'reviews';
  }
): Promise<SearchResult[]> => {
  const results = await searchProducts(query);
  
  let filteredResults = results.filter(result => {
    const matchesCategory = !filters.category || result.category === filters.category;
    const matchesPrice = !filters.priceRange || 
      (result.price >= filters.priceRange[0] && result.price <= filters.priceRange[1]);
    const matchesRating = !filters.rating || (result.rating && result.rating >= filters.rating);
    const matchesMarketplace = !filters.marketplace || result.marketplace === filters.marketplace;
    
    return matchesCategory && matchesPrice && matchesRating && matchesMarketplace;
  });

  // Apply sorting
  if (filters.sortBy) {
    filteredResults = filteredResults.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'reviews':
          return (b.reviews || 0) - (a.reviews || 0);
        default:
          return 0;
      }
    });
  }

  return filteredResults;
};