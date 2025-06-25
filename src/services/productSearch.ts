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

// Ultra-simple static database - no complexity at all
const PRODUCTS: SearchResult[] = [
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
  },
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
  },
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
  }
];

// Extremely simple search - just filter the static array
export const searchProducts = (query: string): Promise<SearchResult[]> => {
  return new Promise((resolve) => {
    // Simple validation
    if (!query || query.trim().length < 2) {
      resolve([]);
      return;
    }

    // Fixed delay
    setTimeout(() => {
      const searchTerm = query.toLowerCase().trim();
      
      // Simple text matching
      const results = PRODUCTS.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );

      resolve(results);
    }, 300); // Shorter delay
  });
};