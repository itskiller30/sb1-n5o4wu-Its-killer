import { toast } from 'react-hot-toast';

export interface SearchResult {
  title: string;
  price: string;
  url: string;
  image?: string;
  marketplace: string;
  rating?: number;
  reviews?: number;
}

const MARKETPLACES = [
  'Amazon',
  'eBay',
  'Walmart',
  'Target',
  'Best Buy',
  'Home Depot',
  'Etsy'
] as const;

export type Marketplace = typeof MARKETPLACES[number];

// Simulated API call - in production, this would be replaced with real API calls
const searchMarketplace = async (query: string, marketplace: Marketplace): Promise<SearchResult[]> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

  // Simulate search results with different prices for each marketplace
  const basePrice = 99.99;
  const priceVariation = (Math.random() - 0.5) * 20;
  const price = (basePrice + priceVariation).toFixed(2);

  return [{
    title: `${query} - ${marketplace} Edition`,
    price,
    url: `https://${marketplace.toLowerCase()}.com/product/${Math.random().toString(36).substring(7)}`,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    marketplace,
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 1000)
  }];
};

export const searchProducts = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.length < 3) {
    toast.error('Please enter at least 3 characters to search');
    return [];
  }

  try {
    // Search all marketplaces in parallel
    const searchPromises = MARKETPLACES.map(marketplace => 
      searchMarketplace(query, marketplace)
        .catch(() => [] as SearchResult[]) // Handle individual marketplace failures gracefully
    );

    const results = await Promise.all(searchPromises);
    const flatResults = results.flat();

    // Sort by price
    return flatResults.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } catch (error) {
    toast.error('Failed to search products. Please try entering details manually.');
    return [];
  }
};