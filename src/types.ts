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
    bestbuy?: string;
    [key: string]: string | undefined;
  };
  affiliateLinks?: {
    amazon?: string;
    ebay?: string;
    walmart?: string;
    target?: string;
    bestbuy?: string;
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
  [key: string]: {
    tag?: string;
    campaignId?: string;
    id?: string;
    baseUrl: string;
    pattern: RegExp;
    commission: string;
    cookieDuration: string;
  };
}

export interface AffiliateClick {
  productId: string;
  marketplace: string;
  userId?: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
  sessionId: string;
}

export interface RevenueMetrics {
  totalClicks: number;
  conversionRate: number;
  averageOrderValue: number;
  totalCommissions: number;
  topPerformingProducts: string[];
  marketplacePerformance: Record<string, {
    clicks: number;
    conversions: number;
    revenue: number;
  }>;
}