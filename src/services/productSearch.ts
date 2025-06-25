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

const MARKETPLACES = [
  'Amazon', 'eBay', 'Walmart', 'Target', 'Best Buy',
  'Home Depot', 'Costco', 'Newegg', 'B&H Photo', 'Etsy'
] as const;

export type Marketplace = typeof MARKETPLACES[number];

// Enhanced sample product database with more realistic data
const SAMPLE_PRODUCTS: Record<string, Partial<SearchResult>[]> = {
  'headphones': [
    { title: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones', price: 279.99, rating: 4.5, reviews: 15420 },
    { title: 'Bose QuietComfort 45 Bluetooth Wireless Noise Cancelling Headphones', price: 329.00, rating: 4.4, reviews: 8930 },
    { title: 'Apple AirPods Pro (2nd Generation) with MagSafe Case', price: 249.00, rating: 4.6, reviews: 24567 },
    { title: 'Sennheiser HD 660S Open-Back Audiophile Headphones', price: 499.95, rating: 4.7, reviews: 3420 },
    { title: 'Audio-Technica ATH-M50x Professional Studio Monitor Headphones', price: 149.00, rating: 4.6, reviews: 12890 }
  ],
  'laptop': [
    { title: 'Apple MacBook Air 13-inch M2 Chip with 8-Core CPU', price: 1199.00, rating: 4.8, reviews: 12450 },
    { title: 'Dell XPS 13 Plus 13.4-inch Touchscreen Laptop', price: 1299.99, rating: 4.3, reviews: 5670 },
    { title: 'HP Spectre x360 14-inch 2-in-1 Laptop', price: 1149.99, rating: 4.4, reviews: 3890 },
    { title: 'Lenovo ThinkPad X1 Carbon Gen 10 Business Laptop', price: 1599.00, rating: 4.5, reviews: 7230 },
    { title: 'ASUS ZenBook 14 Ultra-Slim Laptop', price: 799.99, rating: 4.3, reviews: 4560 }
  ],
  'phone': [
    { title: 'Apple iPhone 15 Pro Max 256GB Natural Titanium', price: 1199.00, rating: 4.7, reviews: 18920 },
    { title: 'Samsung Galaxy S24 Ultra 256GB Titanium Black', price: 1299.99, rating: 4.6, reviews: 14560 },
    { title: 'Google Pixel 8 Pro 128GB Obsidian', price: 999.00, rating: 4.5, reviews: 8740 },
    { title: 'OnePlus 12 5G Smartphone 256GB Silky Black', price: 799.99, rating: 4.4, reviews: 5230 },
    { title: 'Samsung Galaxy S24 128GB Onyx Black', price: 799.99, rating: 4.5, reviews: 11200 }
  ],
  'coffee': [
    { title: 'Breville Barista Express Espresso Machine BES870XL', price: 699.95, rating: 4.4, reviews: 8920 },
    { title: 'Keurig K-Elite Single Serve K-Cup Pod Coffee Maker', price: 169.99, rating: 4.3, reviews: 15670 },
    { title: 'Chemex Classic Series Pour-over Glass Coffeemaker', price: 44.95, rating: 4.6, reviews: 3450 },
    { title: 'Ninja Specialty Coffee Maker with Glass Carafe', price: 179.99, rating: 4.2, reviews: 7890 },
    { title: 'Cuisinart DCC-3200P1 Perfectemp Coffee Maker', price: 99.95, rating: 4.3, reviews: 6780 }
  ],
  'kitchen': [
    { title: 'KitchenAid Stand Mixer Artisan Series 5-Quart', price: 379.99, rating: 4.7, reviews: 12340 },
    { title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker 6 Quart', price: 99.95, rating: 4.6, reviews: 87654 },
    { title: 'Vitamix A3500 Ascent Series Smart Blender', price: 549.95, rating: 4.5, reviews: 6789 },
    { title: 'Cuisinart Elemental 13-Cup Food Processor', price: 199.95, rating: 4.4, reviews: 9870 },
    { title: 'Ninja Foodi Personal Blender with Cups', price: 79.99, rating: 4.3, reviews: 5430 }
  ],
  'fitness': [
    { title: 'Peloton Bike+ Home Fitness Bike with 23.8" HD Touchscreen', price: 2495.00, rating: 4.4, reviews: 5670 },
    { title: 'Bowflex SelectTech 552 Adjustable Dumbbells (Pair)', price: 399.00, rating: 4.6, reviews: 8920 },
    { title: 'NordicTrack Commercial 1750 Treadmill', price: 1999.00, rating: 4.3, reviews: 3450 },
    { title: 'Theragun PRO Percussive Therapy Device', price: 599.00, rating: 4.5, reviews: 7890 },
    { title: 'Resistance Bands Set with Door Anchor and Handles', price: 29.99, rating: 4.4, reviews: 12340 }
  ],
  'gaming': [
    { title: 'Logitech G Pro X Superlight Wireless Gaming Mouse', price: 149.99, rating: 4.6, reviews: 8920 },
    { title: 'Razer DeathAdder V3 Pro Wireless Gaming Mouse', price: 149.99, rating: 4.5, reviews: 6780 },
    { title: 'SteelSeries Apex Pro TKL Mechanical Gaming Keyboard', price: 189.99, rating: 4.4, reviews: 5430 },
    { title: 'HyperX Cloud II Gaming Headset', price: 99.99, rating: 4.5, reviews: 15670 },
    { title: 'ASUS ROG Swift PG279QM 27" Gaming Monitor', price: 699.99, rating: 4.6, reviews: 3450 }
  ],
  'speaker': [
    { title: 'Sonos One (Gen 2) Smart Speaker with Alexa', price: 219.00, rating: 4.4, reviews: 12340 },
    { title: 'JBL Charge 5 Portable Bluetooth Speaker', price: 179.95, rating: 4.6, reviews: 8920 },
    { title: 'Bose SoundLink Revolve+ Portable Bluetooth Speaker', price: 329.00, rating: 4.3, reviews: 6780 },
    { title: 'Ultimate Ears BOOM 3 Portable Bluetooth Speaker', price: 149.99, rating: 4.4, reviews: 5430 },
    { title: 'Amazon Echo Dot (5th Gen) Smart Speaker with Alexa', price: 49.99, rating: 4.5, reviews: 25670 }
  ],
  'watch': [
    { title: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum', price: 429.00, rating: 4.7, reviews: 18920 },
    { title: 'Samsung Galaxy Watch6 Classic 47mm Bluetooth', price: 429.99, rating: 4.5, reviews: 8740 },
    { title: 'Garmin Forerunner 965 GPS Running Smartwatch', price: 599.99, rating: 4.6, reviews: 5230 },
    { title: 'Fitbit Versa 4 Fitness Smartwatch', price: 199.95, rating: 4.3, reviews: 12340 },
    { title: 'Amazfit GTR 4 Smart Watch for Men Women', price: 199.99, rating: 4.4, reviews: 6780 }
  ],
  'tablet': [
    { title: 'Apple iPad Pro 12.9-inch M2 Wi-Fi 128GB', price: 1099.00, rating: 4.8, reviews: 15420 },
    { title: 'Samsung Galaxy Tab S9 Ultra 14.6" 256GB', price: 1199.99, rating: 4.6, reviews: 8930 },
    { title: 'Microsoft Surface Pro 9 13" Touch Screen', price: 999.99, rating: 4.4, reviews: 5670 },
    { title: 'Amazon Fire HD 10 tablet 10.1" 1080p Full HD', price: 149.99, rating: 4.3, reviews: 24567 },
    { title: 'Lenovo Tab P11 Plus 11" Android Tablet', price: 229.99, rating: 4.2, reviews: 3420 }
  ]
};

// Enhanced search simulation with more realistic data
const searchMarketplace = async (query: string, marketplace: Marketplace): Promise<SearchResult[]> => {
  // Simulate realistic network latency
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));

  console.log(`Searching ${marketplace} for: ${query}`);

  // Find matching products based on query
  const queryLower = query.toLowerCase();
  let matchingProducts: Partial<SearchResult>[] = [];

  // Check for exact matches in sample data
  for (const [category, products] of Object.entries(SAMPLE_PRODUCTS)) {
    if (queryLower.includes(category) || category.includes(queryLower) || 
        queryLower.split(' ').some(word => word.length > 2 && category.includes(word))) {
      matchingProducts = [...matchingProducts, ...products];
    }
  }

  // If no exact matches, search through all products for partial matches
  if (matchingProducts.length === 0) {
    const allProducts = Object.values(SAMPLE_PRODUCTS).flat();
    matchingProducts = allProducts.filter(product => 
      product.title?.toLowerCase().includes(queryLower) ||
      queryLower.split(' ').some(word => 
        word.length > 2 && product.title?.toLowerCase().includes(word)
      )
    );
  }

  // If still no matches, generate generic results based on query
  if (matchingProducts.length === 0) {
    const basePrice = 50 + Math.random() * 200;
    matchingProducts = [
      { title: `${query} - Premium Model`, price: basePrice * 1.5, rating: 4.3, reviews: 1250 },
      { title: `${query} - Professional Grade`, price: basePrice * 2, rating: 4.5, reviews: 890 },
      { title: `${query} - Budget Option`, price: basePrice * 0.7, rating: 4.1, reviews: 2340 }
    ];
  }

  // Generate marketplace-specific pricing and details
  const marketplacePricing: Record<string, number> = {
    'Amazon': 1.0 + (Math.random() * 0.2 - 0.1), // ±10%
    'eBay': 0.85 + (Math.random() * 0.3), // 85-115%
    'Walmart': 0.9 + (Math.random() * 0.2), // 90-110%
    'Target': 0.95 + (Math.random() * 0.15), // 95-110%
    'Best Buy': 1.05 + (Math.random() * 0.1), // 105-115%
    'Home Depot': 0.95 + (Math.random() * 0.2), // 95-115%
    'Costco': 0.9 + (Math.random() * 0.15), // 90-105%
    'Newegg': 0.95 + (Math.random() * 0.2), // 95-115%
    'B&H Photo': 1.0 + (Math.random() * 0.15), // 100-115%
    'Etsy': 1.2 + (Math.random() * 0.4) // 120-160% (handmade premium)
  };

  // Select 1-3 products from matching products for this marketplace
  const numResults = Math.min(matchingProducts.length, Math.floor(Math.random() * 3) + 1);
  const selectedProducts = matchingProducts
    .sort(() => Math.random() - 0.5) // Shuffle
    .slice(0, numResults);

  return selectedProducts.map((product, index) => {
    const priceMultiplier = marketplacePricing[marketplace] || 1.0;
    const basePrice = product.price || (100 + Math.random() * 200);
    const finalPrice = Math.round(basePrice * priceMultiplier * 100) / 100;
    
    return {
      title: product.title || `${query} - ${marketplace} Option ${index + 1}`,
      price: finalPrice,
      url: generateProductUrl(marketplace, query, index),
      image: getProductImage(query),
      marketplace,
      rating: product.rating || (3.8 + Math.random() * 1.2),
      reviews: product.reviews || Math.floor(Math.random() * 10000) + 500,
      category: inferCategory(query),
      inStock: Math.random() > 0.05, // 95% in stock
      shippingInfo: getShippingInfo(marketplace)
    };
  });
};

const generateProductUrl = (marketplace: string, query: string, index: number): string => {
  const baseUrls: Record<string, string> = {
    'Amazon': 'https://amazon.com/dp/',
    'eBay': 'https://ebay.com/itm/',
    'Walmart': 'https://walmart.com/ip/',
    'Target': 'https://target.com/p/',
    'Best Buy': 'https://bestbuy.com/site/',
    'Home Depot': 'https://homedepot.com/p/',
    'Costco': 'https://costco.com/product/',
    'Newegg': 'https://newegg.com/p/',
    'B&H Photo': 'https://bhphotovideo.com/c/product/',
    'Etsy': 'https://etsy.com/listing/'
  };

  const baseUrl = baseUrls[marketplace] || 'https://example.com/product/';
  const productId = Math.random().toString(36).substring(2, 12).toUpperCase();
  
  return `${baseUrl}${productId}`;
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
    'book': 'photo-1481627834876-b7833e8f5570',
    'gaming': 'photo-1493711662062-fa541adb3fc8',
    'speaker': 'photo-1608043152269-423dbba4e7e1',
    'tablet': 'photo-1544244015-0df4b3ffc6b0'
  };

  const category = Object.keys(imageCategories).find(cat => 
    query.toLowerCase().includes(cat)
  ) || 'generic';

  const imageId = imageCategories[category] || 'photo-1553062407-98eeb64c6a62';
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&q=80&w=400`;
};

const inferCategory = (query: string): string => {
  const categories: Record<string, string> = {
    'phone|mobile|smartphone|iphone|android': 'Electronics',
    'laptop|computer|pc|macbook|chromebook': 'Electronics',
    'headphones|earbuds|audio|speaker|bluetooth': 'Electronics',
    'camera|photography|lens|dslr': 'Electronics',
    'kitchen|cooking|appliance|blender|mixer': 'Home & Kitchen',
    'fitness|exercise|gym|workout|dumbbell': 'Sports & Outdoors',
    'book|reading|novel|textbook': 'Books',
    'clothing|shirt|pants|shoes|dress': 'Clothing',
    'car|automotive|vehicle|tire': 'Automotive',
    'tool|hardware|drill|hammer': 'Tools & Home Improvement',
    'gaming|mouse|keyboard|headset|monitor': 'Electronics',
    'coffee|espresso|maker|grinder': 'Home & Kitchen',
    'watch|smartwatch|fitness': 'Electronics',
    'tablet|ipad': 'Electronics'
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
    console.log('Query too short:', query);
    toast.error('Please enter at least 2 characters to search');
    return [];
  }

  console.log('Starting product search for:', query);

  try {
    // Search all marketplaces in parallel
    const searchPromises = MARKETPLACES.map(marketplace => 
      searchMarketplace(query, marketplace)
        .catch((error) => {
          console.warn(`Search failed for ${marketplace}:`, error);
          return [] as SearchResult[];
        })
    );

    console.log('Waiting for search results from all marketplaces...');
    const results = await Promise.all(searchPromises);
    const flatResults = results.flat();

    console.log('Raw results count:', flatResults.length);

    // Remove duplicates based on title similarity
    const uniqueResults = flatResults.filter((result, index, self) => {
      const titleWords = result.title.toLowerCase().split(' ').slice(0, 3).join(' ');
      return index === self.findIndex(r => {
        const rTitleWords = r.title.toLowerCase().split(' ').slice(0, 3).join(' ');
        return rTitleWords === titleWords && r.marketplace === result.marketplace;
      });
    });

    console.log('Unique results count:', uniqueResults.length);

    // Sort by a combination of rating, reviews, and price (value score)
    const sortedResults = uniqueResults.sort((a, b) => {
      const scoreA = ((a.rating || 0) * 2) + Math.log(a.reviews || 1) - (a.price / 1000);
      const scoreB = ((b.rating || 0) * 2) + Math.log(b.reviews || 1) - (b.price / 1000);
      return scoreB - scoreA;
    });

    // Limit to top 24 results for better performance
    const finalResults = sortedResults.slice(0, 24);
    
    console.log('Final results count:', finalResults.length);
    
    if (finalResults.length === 0) {
      toast.error(`No results found for "${query}". Try different keywords.`);
    } else {
      toast.success(`Found ${finalResults.length} products across all retailers!`);
    }
    
    return finalResults;
  } catch (error) {
    console.error('Search failed:', error);
    toast.error('Search service temporarily unavailable. Please try again.');
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