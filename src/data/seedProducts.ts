import { Product } from '../types';
import { supabase } from '../lib/supabase';

// Categories for diverse product range
const CATEGORIES = [
  'Tech Essentials',
  'Home & Kitchen',
  'Outdoor Gear',
  'Office Must-Haves',
  'Travel Accessories',
  'Fitness Equipment',
  'Smart Home',
  'Pet Essentials',
  'Beauty & Wellness',
  'Books & Learning'
];

// Tags for better product classification
const TAG_GROUPS = {
  tech: ['Gadgets', 'Smart Home', 'Accessories', 'Productivity', 'Innovation'],
  home: ['Kitchen', 'Organization', 'Decor', 'Cleaning', 'Comfort'],
  outdoor: ['Adventure', 'Camping', 'Sports', 'Travel', 'Durability'],
  office: ['Ergonomic', 'Stationery', 'Tech', 'Storage', 'Comfort'],
  lifestyle: ['Wellness', 'Fitness', 'Health', 'Self-Care', 'Eco-Friendly']
};

// Generate realistic price within range
const generatePrice = (min: number, max: number): number => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

// Generate realistic rating above 10
const generateRating = (): number => {
  return Number((10 + Math.random() * 1.5).toFixed(1));
};

// Generate realistic review count
const generateReviews = (): number => {
  return Math.floor(500 + Math.random() * 4500);
};

// Get random tags from groups
const getRandomTags = (): string[] => {
  const allTags = Object.values(TAG_GROUPS).flat();
  const numTags = Math.floor(2 + Math.random() * 3);
  const tags: string[] = [];
  
  while (tags.length < numTags) {
    const tag = allTags[Math.floor(Math.random() * allTags.length)];
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
  
  return tags;
};

// Generate marketplace links with realistic prices
const generateMarketplaceLinks = (basePrice: number) => {
  const variance = 0.2; // 20% price variance
  return {
    amazon: `https://amazon.com/dp/${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
    ebay: `https://ebay.com/itm/${Math.floor(Math.random() * 999999999)}`,
    walmart: `https://walmart.com/ip/${Math.floor(Math.random() * 999999999)}`,
    bestbuy: `https://bestbuy.com/site/${Math.random().toString(36).substring(2, 12)}`
  };
};

// Generate a single product
const generateProduct = (index: number): Omit<Product, 'id'> => {
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const basePrice = generatePrice(20, 500);
  
  return {
    name: `Premium ${category} Essential #${index}`,
    description: `High-quality ${category.toLowerCase()} item that exceeds expectations. Recommended by our community for its exceptional durability, performance, and value for money.`,
    price: basePrice,
    rating: generateRating(),
    reviews: generateReviews(),
    image: `https://source.unsplash.com/800x600/?${encodeURIComponent(category.toLowerCase())}`,
    category,
    tags: getRandomTags(),
    marketplaceLinks: generateMarketplaceLinks(basePrice),
    status: 'approved',
    submittedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 90 days
    approvedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // Random date within last 30 days
  };
};

// Seed the database with products
export const seedProducts = async (count: number = 1000) => {
  const batchSize = 50; // Insert in batches to avoid timeouts
  const batches = Math.ceil(count / batchSize);
  
  console.log(`Starting to seed ${count} products...`);
  
  for (let i = 0; i < batches; i++) {
    const start = i * batchSize;
    const end = Math.min(start + batchSize, count);
    const products = Array.from({ length: end - start }, (_, index) => 
      generateProduct(start + index + 1)
    );
    
    const { error } = await supabase
      .from('products')
      .insert(products);
    
    if (error) {
      console.error(`Error seeding batch ${i + 1}:`, error);
      throw error;
    }
    
    console.log(`Seeded batch ${i + 1} of ${batches} (${end} products)`);
  }
  
  console.log(`Successfully seeded ${count} products!`);
};

// Clear all products from the database
export const clearProducts = async () => {
  const { error } = await supabase
    .from('products')
    .delete()
    .neq('id', '0'); // Delete all products
    
  if (error) {
    console.error('Error clearing products:', error);
    throw error;
  }
  
  console.log('Successfully cleared all products!');
};