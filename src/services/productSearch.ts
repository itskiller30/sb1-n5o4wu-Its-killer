import toast from 'react-hot-toast';

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

const MARKETPLACES = ['Amazon', 'eBay', 'Walmart', 'Target', 'Best Buy'] as const;
export type Marketplace = typeof MARKETPLACES[number];

// Simplified, reliable product database
const PRODUCT_DATABASE: Record<string, SearchResult[]> = {
  'headphones': [
    {
      title: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
      price: 279.99,
      url: 'https://amazon.com/dp/B0863TXGM3',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
      marketplace: 'Amazon',
      rating: 4.5,
      reviews: 15420,
      category: 'Electronics',
      inStock: true,
      shippingInfo: 'Free shipping with Prime'
    },
    {
      title: 'Sony WH-1000XM4 Wireless Headphones',
      price: 299.99,
      url: 'https://bestbuy.com/site/sony-wh1000xm4',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
      marketplace: 'Best Buy',
      rating: 4.4,
      reviews: 8930,
      category: 'Electronics',
      inStock: true,
      shippingInfo: 'Free shipping $35+'
    }
  ],
  'laptop': [
    {
      title: 'Apple MacBook Air 13-inch M2 Chip',
      price: 1199.00,
      url: 'https://amazon.com/dp/B0B3C2R8MP',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400',
      marketplace: 'Amazon',
      rating: 4.8,
      reviews: 12450,
      category: 'Electronics',
      inStock: true,
      shippingInfo: 'Free shipping with Prime'
    },
    {
      title: 'MacBook Air M2 13-inch',
      price: 1249.99,
      url: 'https://bestbuy.com/site/macbook-air-m2',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400',
      marketplace: 'Best Buy',
      rating: 4.7,
      reviews: 8920,
      category: 'Electronics',
      inStock: true,
      shippingInfo: 'Free shipping $35+'
    }
  ],
  'coffee': [
    {
      title: 'Breville Barista Express Espresso Machine',
      price: 699.95,
      url: 'https://amazon.com/dp/B00CH9QWOU',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400',
      marketplace: 'Amazon',
      rating: 4.4,
      reviews: 8920,
      category: 'Home & Kitchen',
      inStock: true,
      shippingInfo: 'Free shipping with Prime'
    },
    {
      title: 'Breville Barista Express Coffee Machine',
      price: 749.99,
      url: 'https://target.com/p/breville-barista',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400',
      marketplace: 'Target',
      rating: 4.3,
      reviews: 6780,
      category: 'Home & Kitchen',
      inStock: true,
      shippingInfo: 'Free shipping $35+'
    }
  ],
  'phone': [
    {
      title: 'Apple iPhone 15 Pro Max 256GB',
      price: 1199.00,
      url: 'https://amazon.com/dp/B0CHX1W1XY',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400',
      marketplace: 'Amazon',
      rating: 4.7,
      reviews: 18920,
      category: 'Electronics',
      inStock: true,
      shippingInfo: 'Free shipping with Prime'
    },
    {
      title: 'iPhone 15 Pro Max 256GB Natural Titanium',
      price: 1199.99,
      url: 'https://target.com/p/iphone-15-pro-max',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400',
      marketplace: 'Target',
      rating: 4.6,
      reviews: 14560,
      category: 'Electronics',
      inStock: true,
      shippingInfo: 'Same-day delivery available'
    }
  ],
  'kitchen': [
    {
      title: 'KitchenAid Stand Mixer Artisan Series',
      price: 379.99,
      url: 'https://amazon.com/dp/B00005UP2P',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=400',
      marketplace: 'Amazon',
      rating: 4.7,
      reviews: 12340,
      category: 'Home & Kitchen',
      inStock: true,
      shippingInfo: 'Free shipping with Prime'
    },
    {
      title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
      price: 99.95,
      url: 'https://walmart.com/ip/instant-pot-duo',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=400',
      marketplace: 'Walmart',
      rating: 4.6,
      reviews: 87654,
      category: 'Home & Kitchen',
      inStock: true,
      shippingInfo: 'Free 2-day shipping $35+'
    }
  ]
};

// Simple, reliable search function
export const searchProducts = async (query: string): Promise<SearchResult[]> => {
  // Input validation
  if (!query || typeof query !== 'string' || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  console.log('🔍 Searching for:', searchTerm);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    let results: SearchResult[] = [];

    // Direct category matches
    for (const [category, products] of Object.entries(PRODUCT_DATABASE)) {
      if (searchTerm.includes(category) || category.includes(searchTerm)) {
        results.push(...products);
      }
    }

    // Keyword search in product titles
    if (results.length === 0) {
      const allProducts = Object.values(PRODUCT_DATABASE).flat();
      results = allProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        searchTerm.split(' ').some(word => 
          word.length > 2 && product.title.toLowerCase().includes(word)
        )
      );
    }

    // Generate additional marketplace results
    if (results.length > 0) {
      const baseProduct = results[0];
      const additionalResults: SearchResult[] = [];

      MARKETPLACES.forEach(marketplace => {
        if (!results.some(r => r.marketplace === marketplace)) {
          const priceVariation = 0.9 + Math.random() * 0.2; // ±10% price variation
          additionalResults.push({
            ...baseProduct,
            marketplace,
            price: Math.round(baseProduct.price * priceVariation * 100) / 100,
            url: `https://${marketplace.toLowerCase()}.com/product/${Math.random().toString(36).substring(7)}`,
            reviews: Math.floor(baseProduct.reviews * (0.5 + Math.random() * 0.5)),
            shippingInfo: getShippingInfo(marketplace)
          });
        }
      });

      results.push(...additionalResults);
    }

    // Fallback: generate generic results
    if (results.length === 0) {
      const basePrice = 50 + Math.random() * 200;
      results = MARKETPLACES.slice(0, 3).map((marketplace, index) => ({
        title: `${query} - ${marketplace} Option`,
        price: Math.round((basePrice + index * 20) * 100) / 100,
        url: `https://${marketplace.toLowerCase()}.com/search?q=${encodeURIComponent(query)}`,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400',
        marketplace,
        rating: 4.0 + Math.random() * 1.0,
        reviews: Math.floor(Math.random() * 5000) + 500,
        category: 'General',
        inStock: true,
        shippingInfo: getShippingInfo(marketplace)
      }));
    }

    // Sort by value (rating * reviews / price)
    results.sort((a, b) => {
      const scoreA = ((a.rating || 0) * Math.log(a.reviews || 1)) / a.price;
      const scoreB = ((b.rating || 0) * Math.log(b.reviews || 1)) / b.price;
      return scoreB - scoreA;
    });

    console.log('✅ Search completed:', results.length, 'results');
    return results.slice(0, 12); // Limit to 12 results

  } catch (error) {
    console.error('❌ Search error:', error);
    return [];
  }
};

const getShippingInfo = (marketplace: string): string => {
  const shippingOptions: Record<string, string> = {
    'Amazon': 'Free shipping with Prime',
    'eBay': 'Varies by seller',
    'Walmart': 'Free 2-day shipping $35+',
    'Target': 'Same-day delivery available',
    'Best Buy': 'Free shipping $35+'
  };
  return shippingOptions[marketplace] || 'Standard shipping';
};