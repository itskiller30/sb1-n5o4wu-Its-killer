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

// Enhanced search simulation with more realistic data
const searchMarketplace = async (query: string, marketplace: Marketplace): Promise<SearchResult[]> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 200));

  const basePrice = 50 + Math.random() * 200;
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

  const price = marketplacePricing[marketplace] || basePrice;
  const rating = 3.5 + Math.random() * 1.5;
  const reviews = Math.floor(Math.random() * 5000) + 100;

  // Generate multiple results per marketplace
  const numResults = Math.floor(Math.random() * 3) + 1;
  const results: SearchResult[] = [];

  for (let i = 0; i < numResults; i++) {
    const variation = 0.9 + Math.random() * 0.2;
    results.push({
      title: `${query} - ${marketplace} ${i > 0 ? `Option ${i + 1}` : 'Premium'}`,
      price: Math.round(price * variation * 100) / 100,
      url: `https://${marketplace.toLowerCase().replace(/\s+/g, '')}.com/product/${Math.random().toString(36).substring(7)}`,
      image: getProductImage(query),
      marketplace,
      rating: Math.round(rating * 10) / 10,
      reviews: Math.floor(reviews * variation),
      category: inferCategory(query),
      inStock: Math.random() > 0.1, // 90% in stock
      shippingInfo: getShippingInfo(marketplace)
    });
  }

  return results;
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
    return uniqueResults.sort((a, b) => {
      const scoreA = (a.rating || 0) * Math.log(a.reviews || 1) / a.price;
      const scoreB = (b.rating || 0) * Math.log(b.reviews || 1) / b.price;
      return scoreB - scoreA;
    });
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