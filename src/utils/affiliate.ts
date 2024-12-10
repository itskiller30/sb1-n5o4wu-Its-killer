import { AffiliateConfig, Product } from '../types';

export const affiliateConfig: AffiliateConfig = {
  amazon: {
    tag: 'itskiller-20',
    baseUrl: 'https://www.amazon.com/dp/',
    pattern: /(?:\/dp\/|\/gp\/product\/)([A-Z0-9]{10})/,
    commission: '4-10%',
    cookieDuration: '24 hours'
  },
  ebay: {
    campaignId: '5338976521',
    baseUrl: 'https://www.ebay.com/itm/',
    pattern: /\/itm\/(\d+)/,
    commission: '4-70%',
    cookieDuration: '24 hours'
  },
  walmart: {
    id: '2149393',
    baseUrl: 'https://www.walmart.com/ip/',
    pattern: /\/ip\/(\d+)/,
    commission: '1-4%',
    cookieDuration: '3 days'
  },
  target: {
    id: 'xyz123',
    baseUrl: 'https://www.target.com/p/',
    pattern: /\/p\/([A-Za-z0-9-]+)/,
    commission: '1-8%',
    cookieDuration: '7 days'
  },
  bestbuy: {
    id: 'best123',
    baseUrl: 'https://www.bestbuy.com/site/',
    pattern: /\/site\/([A-Za-z0-9-]+)/,
    commission: '1-7%',
    cookieDuration: '24 hours'
  }
};

// Optimize affiliate links based on user data and conversion rates
export const optimizeAffiliateLink = (url: string, marketplace: keyof AffiliateConfig, userData?: any) => {
  const baseLink = generateAffiliateLink(url, marketplace);
  
  // Add UTM parameters for tracking
  const utmParams = new URLSearchParams({
    utm_source: 'itskiller',
    utm_medium: 'affiliate',
    utm_campaign: `${marketplace}_products`,
    utm_content: userData?.source || 'direct'
  });

  return `${baseLink}&${utmParams.toString()}`;
};

// Track affiliate link clicks
export const trackAffiliateClick = async (productId: string, marketplace: string, userId?: string) => {
  try {
    const clickData = {
      productId,
      marketplace,
      userId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    // Send to analytics endpoint
    await fetch('/api/track/affiliate-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clickData)
    });
  } catch (error) {
    console.error('Failed to track affiliate click:', error);
  }
};

// Price comparison and best deal finder
export const findBestDeal = (marketplaceLinks: Product['marketplaceLinks']): {
  marketplace: string;
  price: number;
  savings: number;
} | null => {
  if (!marketplaceLinks) return null;

  const prices = Object.entries(marketplaceLinks)
    .map(([marketplace, data]) => ({
      marketplace,
      price: typeof data === 'object' ? data.price : 0
    }))
    .filter(item => item.price > 0);

  if (prices.length === 0) return null;

  const bestDeal = prices.reduce((best, current) => 
    current.price < best.price ? current : best
  );

  const avgPrice = prices.reduce((sum, item) => sum + item.price, 0) / prices.length;
  const savings = avgPrice - bestDeal.price;

  return {
    marketplace: bestDeal.marketplace,
    price: bestDeal.price,
    savings: savings > 0 ? savings : 0
  };
};

export const extractProductId = (url: string, marketplace: keyof AffiliateConfig): string | null => {
  try {
    const pattern = affiliateConfig[marketplace].pattern;
    const match = url.match(pattern);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

export const generateAffiliateLink = (url: string, marketplace: keyof AffiliateConfig): string => {
  try {
    const config = affiliateConfig[marketplace];
    const productId = extractProductId(url, marketplace);
    
    if (!productId) return url;

    switch (marketplace) {
      case 'amazon':
        return `${config.baseUrl}${productId}?tag=${config.tag}&linkCode=ll1`;
      
      case 'ebay':
        return `${config.baseUrl}${productId}?campid=${config.campaignId}&toolid=10001`;
      
      case 'walmart':
        return `${config.baseUrl}${productId}?affiliateid=${config.id}&sourceid=imp_000011112222333344`;
      
      case 'target':
        return `${config.baseUrl}${productId}?afid=${config.id}&ref=tgt_adv_xasd0002`;
      
      case 'bestbuy':
        return `${config.baseUrl}${productId}?aid=${config.id}`;
      
      default:
        return url;
    }
  } catch {
    return url;
  }
};

export const processAffiliateLinks = (marketplaceLinks: Product['marketplaceLinks']): Product['affiliateLinks'] => {
  if (!marketplaceLinks) return undefined;

  const affiliateLinks: Product['affiliateLinks'] = {};

  Object.entries(marketplaceLinks).forEach(([marketplace, url]) => {
    if (!url) return;

    if (marketplace in affiliateConfig) {
      affiliateLinks[marketplace] = generateAffiliateLink(url, marketplace as keyof AffiliateConfig);
    } else {
      affiliateLinks[marketplace] = url;
    }
  });

  return affiliateLinks;
};