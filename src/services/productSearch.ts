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

// Static product database for reliable search
const STATIC_PRODUCTS: SearchResult[] = [
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
    title: 'Breville Espresso Machine',
    price: 749.99,
    url: 'https://williams-sonoma.com/breville-espresso',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400',
    marketplace: 'Williams Sonoma',
    rating: 4.6,
    reviews: 3420,
    category: 'Home & Kitchen',
    inStock: true,
    shippingInfo: 'Free shipping $99+'
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
  },
  {
    title: 'iPhone 15 Pro Max 256GB',
    price: 1199.00,
    url: 'https://apple.com/iphone-15-pro',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400',
    marketplace: 'Apple Store',
    rating: 4.8,
    reviews: 25430,
    category: 'Electronics',
    inStock: true,
    shippingInfo: 'Free shipping'
  },
  {
    title: 'Vitamix A3500 Ascent Series Blender',
    price: 549.95,
    url: 'https://amazon.com/dp/B077JBQZPX',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&q=80&w=400',
    marketplace: 'Amazon',
    rating: 4.5,
    reviews: 6789,
    category: 'Home & Kitchen',
    inStock: true,
    shippingInfo: 'Free shipping with Prime'
  },
  {
    title: 'Vitamix Ascent A3500 Blender',
    price: 599.95,
    url: 'https://vitamix.com/us/en_us/shop/a3500',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&q=80&w=400',
    marketplace: 'Vitamix',
    rating: 4.6,
    reviews: 4320,
    category: 'Home & Kitchen',
    inStock: true,
    shippingInfo: 'Free shipping $75+'
  }
];

// Simple, reliable search function
export const searchProducts = (query: string): Promise<SearchResult[]> => {
  return new Promise((resolve) => {
    if (!query || query.trim().length < 2) {
      resolve([]);
      return;
    }

    setTimeout(() => {
      const searchTerm = query.toLowerCase().trim();
      
      const results = STATIC_PRODUCTS.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.marketplace.toLowerCase().includes(searchTerm)
      );

      resolve(results);
    }, 300);
  });
};