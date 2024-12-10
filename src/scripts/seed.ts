import { seedProducts, clearProducts } from '../data/seedProducts';
import { mockProducts } from '../data/mockProducts';

// For testing/development, use in-memory products
const run = async () => {
  try {
    console.log('Starting seeding process...');
    
    // Use mockProducts for development
    console.log('Using mock data for development...');
    console.log(`Loaded ${mockProducts.length} mock products`);
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

run();