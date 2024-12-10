export interface Product {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  category: string;
  tags: string[];
  marketplaceLinks: {
    amazon?: string;
    ebay?: string;
    walmart?: string;
    target?: string;
    [key: string]: string | undefined;
  };
  affiliateLinks?: {
    amazon?: string;
    ebay?: string;
    walmart?: string;
    target?: string;
    [key: string]: string | undefined;
  };
  lowestPrice?: number;
  lowestPriceMarketplace?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  moderationNote?: string;
}

export type SortOption = 'rating' | 'price' | 'reviews';

export interface MarketplaceLink {
  url: string;
  price?: number;
  inStock?: boolean;
}

export interface AffiliateConfig {
  amazon: {
    tag: string;
    baseUrl: string;
    pattern: RegExp;
  };
  ebay: {
    campaignId: string;
    baseUrl: string;
    pattern: RegExp;
  };
  walmart: {
    id: string;
    baseUrl: string;
    pattern: RegExp;
  };
  target: {
    id: string;
    baseUrl: string;
    pattern: RegExp;
  };
}