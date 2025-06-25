import { Product } from '../types';

// Simple affiliate link generation
export const generateAffiliateLink = (url: string, marketplace: string): string => {
  // In a real app, this would add proper affiliate parameters
  return url;
};

// Simple affiliate click tracking
export const trackAffiliateClick = async (productId: string, marketplace: string) => {
  console.log('Affiliate click tracked:', { productId, marketplace });
};

// Simple best deal finder
export const findBestDeal = (marketplaceLinks: Product['marketplaceLinks']): {
  marketplace: string;
  price: number;
} | null => {
  if (!marketplaceLinks) return null;

  // Mock pricing for demo
  const mockPrices: Record<string, number> = {
    amazon: Math.floor(Math.random() * 100) + 50,
    ebay: Math.floor(Math.random() * 100) + 45,
    walmart: Math.floor(Math.random() * 100) + 55,
    target: Math.floor(Math.random() * 100) + 52,
    bestbuy: Math.floor(Math.random() * 100) + 58
  };

  const prices = Object.keys(marketplaceLinks)
    .map(marketplace => ({
      marketplace,
      price: mockPrices[marketplace] || Math.floor(Math.random() * 100) + 50
    }))
    .filter(item => item.price > 0);

  if (prices.length === 0) return null;

  return prices.reduce((best, current) => 
    current.price < best.price ? current : best
  );
};