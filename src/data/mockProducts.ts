import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Ember Temperature Control Smart Mug 2',
    description: 'Revolutionary smart mug that maintains your perfect drinking temperature for hours. App-controlled with precision heating technology that coffee enthusiasts swear by.',
    rating: 11.8,
    reviews: 12847,
    price: 129.95,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800',
    category: 'Tech Essentials',
    tags: ['Smart Home', 'Coffee', 'Temperature Control'],
    marketplaceLinks: {
      amazon: 'https://amazon.com/dp/B07NQRM6ML',
      target: 'https://target.com/p/ember-mug',
      bestbuy: 'https://bestbuy.com/site/ember-mug'
    },
    lowestPrice: 119.95,
    lowestPriceMarketplace: 'Target',
    status: 'approved',
    submittedAt: '2024-03-16T00:00:00Z',
    approvedAt: '2024-03-16T01:30:00Z'
  },
  {
    id: '2',
    name: 'Dyson V15 Detect Absolute',
    description: 'The most advanced cordless vacuum with laser dust detection and intelligent suction adjustment. Transforms cleaning from chore to satisfaction.',
    rating: 11.6,
    reviews: 8934,
    price: 749.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Kitchen',
    tags: ['Cleaning', 'Cordless', 'Premium'],
    marketplaceLinks: {
      amazon: 'https://amazon.com/dp/B08V1JBXQX',
      dyson: 'https://dyson.com/vacuum-cleaners/cordless',
      bestbuy: 'https://bestbuy.com/site/dyson-v15'
    },
    lowestPrice: 699.99,
    lowestPriceMarketplace: 'Best Buy',
    status: 'approved',
    submittedAt: '2024-03-15T00:00:00Z',
    approvedAt: '2024-03-15T02:00:00Z'
  },
  {
    id: '3',
    name: 'Apple AirPods Pro (2nd Generation)',
    description: 'Industry-leading noise cancellation meets spatial audio. The gold standard for wireless earbuds that delivers an unmatched listening experience.',
    rating: 11.4,
    reviews: 24567,
    price: 249.00,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&q=80&w=800',
    category: 'Tech Essentials',
    tags: ['Audio', 'Wireless', 'Apple'],
    marketplaceLinks: {
      amazon: 'https://amazon.com/dp/B0BDHWDR12',
      apple: 'https://apple.com/airpods-pro',
      bestbuy: 'https://bestbuy.com/site/airpods-pro'
    },
    lowestPrice: 229.00,
    lowestPriceMarketplace: 'Amazon',
    status: 'approved',
    submittedAt: '2024-03-14T00:00:00Z',
    approvedAt: '2024-03-14T01:15:00Z'
  },
  {
    id: '4',
    name: 'Patagonia Better Sweater Fleece Jacket',
    description: 'The ultimate layer for any adventure. Made from recycled polyester fleece, this jacket has been a favorite for over a decade for good reason.',
    rating: 11.9,
    reviews: 5678,
    price: 99.00,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=800',
    category: 'Outdoor Gear',
    tags: ['Fleece', 'Sustainable', 'Versatile'],
    marketplaceLinks: {
      patagonia: 'https://patagonia.com/product/better-sweater',
      rei: 'https://rei.com/product/patagonia-better-sweater',
      amazon: 'https://amazon.com/dp/B01N4NQZJX'
    },
    lowestPrice: 89.00,
    lowestPriceMarketplace: 'REI',
    status: 'approved',
    submittedAt: '2024-03-13T00:00:00Z',
    approvedAt: '2024-03-13T03:00:00Z'
  },
  {
    id: '5',
    name: 'Herman Miller Aeron Chair',
    description: 'The chair that redefined office seating. Ergonomic perfection that supports you through the longest work sessions. An investment in your health.',
    rating: 12.1,
    reviews: 3456,
    price: 1395.00,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    category: 'Office Must-Haves',
    tags: ['Ergonomic', 'Premium', 'Health'],
    marketplaceLinks: {
      hermanmiller: 'https://hermanmiller.com/products/seating/office-chairs/aeron-chairs',
      amazon: 'https://amazon.com/dp/B003M2P2TC',
      wayfair: 'https://wayfair.com/herman-miller-aeron'
    },
    lowestPrice: 1295.00,
    lowestPriceMarketplace: 'Wayfair',
    status: 'approved',
    submittedAt: '2024-03-12T00:00:00Z',
    approvedAt: '2024-03-12T04:30:00Z'
  },
  {
    id: '6',
    name: 'Peak Design Everyday Backpack V2',
    description: 'The photographer\'s dream bag that works for everyone. Modular organization meets weatherproof durability in the most thoughtfully designed backpack.',
    rating: 11.7,
    reviews: 4321,
    price: 279.95,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    category: 'Travel Accessories',
    tags: ['Photography', 'Modular', 'Weatherproof'],
    marketplaceLinks: {
      peakdesign: 'https://peakdesign.com/products/everyday-backpack',
      amazon: 'https://amazon.com/dp/B07FQCQBQX',
      bhphoto: 'https://bhphotovideo.com/peak-design-everyday'
    },
    lowestPrice: 259.95,
    lowestPriceMarketplace: 'B&H Photo',
    status: 'approved',
    submittedAt: '2024-03-11T00:00:00Z',
    approvedAt: '2024-03-11T02:15:00Z'
  },
  {
    id: '7',
    name: 'Hydro Flask Standard Mouth 21 oz',
    description: 'The water bottle that started the insulated bottle revolution. Keeps drinks cold for 24 hours, hot for 12. Built to last a lifetime.',
    rating: 11.3,
    reviews: 18765,
    price: 39.95,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
    category: 'Outdoor Gear',
    tags: ['Hydration', 'Insulated', 'Durable'],
    marketplaceLinks: {
      hydroflask: 'https://hydroflask.com/21-oz-standard-mouth',
      rei: 'https://rei.com/product/hydro-flask-21oz',
      amazon: 'https://amazon.com/dp/B077JBQZPX'
    },
    lowestPrice: 34.95,
    lowestPriceMarketplace: 'REI',
    status: 'approved',
    submittedAt: '2024-03-10T00:00:00Z',
    approvedAt: '2024-03-10T01:45:00Z'
  },
  {
    id: '8',
    name: 'Vitamix A3500 Ascent Series Blender',
    description: 'Professional-grade blending power that transforms your kitchen. Self-cleaning, variable speed control, and built to blend anything you throw at it.',
    rating: 11.5,
    reviews: 6789,
    price: 549.95,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Kitchen',
    tags: ['Blender', 'Professional', 'Versatile'],
    marketplaceLinks: {
      vitamix: 'https://vitamix.com/us/en_us/shop/a3500',
      amazon: 'https://amazon.com/dp/B077JBQZPX',
      williams: 'https://williams-sonoma.com/vitamix-a3500'
    },
    lowestPrice: 499.95,
    lowestPriceMarketplace: 'Williams Sonoma',
    status: 'approved',
    submittedAt: '2024-03-09T00:00:00Z',
    approvedAt: '2024-03-09T03:20:00Z'
  },
  {
    id: '9',
    name: 'Allbirds Tree Runners',
    description: 'The world\'s most comfortable shoes made from eucalyptus tree fiber. Sustainable, machine washable, and perfect for any occasion.',
    rating: 11.2,
    reviews: 9876,
    price: 98.00,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    category: 'Fashion',
    tags: ['Sustainable', 'Comfortable', 'Versatile'],
    marketplaceLinks: {
      allbirds: 'https://allbirds.com/products/mens-tree-runners',
      amazon: 'https://amazon.com/dp/B07FQCQBQX',
      nordstrom: 'https://nordstrom.com/allbirds-tree-runners'
    },
    lowestPrice: 88.00,
    lowestPriceMarketplace: 'Nordstrom',
    status: 'approved',
    submittedAt: '2024-03-08T00:00:00Z',
    approvedAt: '2024-03-08T02:30:00Z'
  },
  {
    id: '10',
    name: 'Ooni Koda 16 Gas Pizza Oven',
    description: 'Restaurant-quality pizza at home in just 60 seconds. Reaches 950°F and transforms your backyard into a pizzeria. Pure magic.',
    rating: 12.0,
    reviews: 4567,
    price: 599.00,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Kitchen',
    tags: ['Pizza', 'Outdoor Cooking', 'High Heat'],
    marketplaceLinks: {
      ooni: 'https://ooni.com/products/ooni-koda-16',
      amazon: 'https://amazon.com/dp/B07FQCQBQX',
      williams: 'https://williams-sonoma.com/ooni-koda-16'
    },
    lowestPrice: 549.00,
    lowestPriceMarketplace: 'Amazon',
    status: 'approved',
    submittedAt: '2024-03-07T00:00:00Z',
    approvedAt: '2024-03-07T01:00:00Z'
  },
  {
    id: '11',
    name: 'Theragun PRO Percussive Therapy Device',
    description: 'Professional-grade muscle recovery that athletes swear by. Deep muscle treatment that accelerates recovery and reduces soreness.',
    rating: 11.6,
    reviews: 7890,
    price: 599.00,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    category: 'Fitness Equipment',
    tags: ['Recovery', 'Professional', 'Therapeutic'],
    marketplaceLinks: {
      therabody: 'https://therabody.com/us/en-us/theragun-pro.html',
      amazon: 'https://amazon.com/dp/B07FQCQBQX',
      bestbuy: 'https://bestbuy.com/site/theragun-pro'
    },
    lowestPrice: 549.00,
    lowestPriceMarketplace: 'Best Buy',
    status: 'approved',
    submittedAt: '2024-03-06T00:00:00Z',
    approvedAt: '2024-03-06T02:45:00Z'
  },
  {
    id: '12',
    name: 'Nest Learning Thermostat (4th Gen)',
    description: 'The thermostat that learns your schedule and saves energy automatically. Beautiful design meets intelligent climate control.',
    rating: 11.4,
    reviews: 15432,
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    category: 'Smart Home',
    tags: ['Smart Thermostat', 'Energy Saving', 'Learning'],
    marketplaceLinks: {
      google: 'https://store.google.com/product/nest_learning_thermostat',
      amazon: 'https://amazon.com/dp/B07FQCQBQX',
      homedepot: 'https://homedepot.com/nest-thermostat'
    },
    lowestPrice: 229.99,
    lowestPriceMarketplace: 'Home Depot',
    status: 'approved',
    submittedAt: '2024-03-05T00:00:00Z',
    approvedAt: '2024-03-05T01:30:00Z'
  },
  {
    id: '13',
    name: 'Yeti Rambler 20 oz Tumbler',
    description: 'The tumbler that keeps your drink perfect from first sip to last drop. Double-wall vacuum insulation and dishwasher safe.',
    rating: 11.1,
    reviews: 23456,
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800',
    category: 'Outdoor Gear',
    tags: ['Insulated', 'Durable', 'Versatile'],
    marketplaceLinks: {
      yeti: 'https://yeti.com/drinkware/tumblers/rambler-20-oz-tumbler',
      amazon: 'https://amazon.com/dp/B07FQCQBQX',
      rei: 'https://rei.com/product/yeti-rambler-20oz'
    },
    lowestPrice: 29.99,
    lowestPriceMarketplace: 'REI',
    status: 'approved',
    submittedAt: '2024-03-04T00:00:00Z',
    approvedAt: '2024-03-04T03:15:00Z'
  },
  {
    id: '14',
    name: 'Lego Architecture Statue of Liberty',
    description: 'Iconic architecture meets timeless building fun. A masterpiece that looks stunning on display and provides hours of meditative building.',
    rating: 11.8,
    reviews: 3456,
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    category: "Kiddo's",
    tags: ['Building', 'Architecture', 'Display'],
    marketplaceLinks: {
      lego: 'https://lego.com/en-us/product/statue-of-liberty-21042',
      amazon: 'https://amazon.com/dp/B07FQCQBQX',
      target: 'https://target.com/p/lego-statue-liberty'
    },
    lowestPrice: 99.99,
    lowestPriceMarketplace: 'Target',
    status: 'approved',
    submittedAt: '2024-03-03T00:00:00Z',
    approvedAt: '2024-03-03T02:00:00Z'
  },
  {
    id: '15',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description: 'The kitchen appliance that started a revolution. Seven appliances in one that makes cooking faster, easier, and more delicious.',
    rating: 11.3,
    reviews: 87654,
    price: 99.95,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Kitchen',
    tags: ['Multi-Cooker', 'Time Saving', 'Versatile'],
    marketplaceLinks: {
      instantpot: 'https://instantpot.com/products/instant-pot-duo-7-in-1',
      amazon: 'https://amazon.com/dp/B00FLYWNYQ',
      target: 'https://target.com/p/instant-pot-duo'
    },
    lowestPrice: 79.95,
    lowestPriceMarketplace: 'Target',
    status: 'approved',
    submittedAt: '2024-03-02T00:00:00Z',
    approvedAt: '2024-03-02T01:45:00Z'
  }
];