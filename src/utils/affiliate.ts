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

// Track affiliate link clicks for analytics and optimization
export const trackAffiliateClick = async (productId: string, marketplace: string, userId?: string) => {
  try {
    const clickData = {
      productId,
      marketplace,
      userId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      sessionId: getSessionId()
    };

    // Store locally for analytics
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    clicks.push(clickData);
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks.slice(-100))); // Keep last 100 clicks

    // Send to analytics endpoint (would be implemented server-side)
    console.log('Affiliate click tracked:', clickData);
  } catch (error) {
    console.error('Failed to track affiliate click:', error);
  }
};

// Generate unique session ID for tracking
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

// Price comparison and best deal finder with affiliate optimization
export const findBestDeal = (marketplaceLinks: Product['marketplaceLinks']): {
  marketplace: string;
  price: number;
  savings: number;
  affiliateUrl: string;
} | null => {
  if (!marketplaceLinks) return null;

  const prices = Object.entries(marketplaceLinks)
    .map(([marketplace, url]) => {
      // Extract price from URL or use mock pricing for demo
      const mockPrices: Record<string, number> = {
        amazon: Math.floor(Math.random() * 100) + 50,
        ebay: Math.floor(Math.random() * 100) + 45,
        walmart: Math.floor(Math.random() * 100) + 55,
        target: Math.floor(Math.random() * 100) + 52,
        bestbuy: Math.floor(Math.random() * 100) + 58
      };
      
      return {
        marketplace,
        price: mockPrices[marketplace] || Math.floor(Math.random() * 100) + 50,
        url,
        affiliateUrl: generateAffiliateLink(url, marketplace as keyof AffiliateConfig)
      };
    })
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
    savings: savings > 0 ? savings : 0,
    affiliateUrl: bestDeal.affiliateUrl
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
        return `${config.baseUrl}${productId}?tag=${config.tag}&linkCode=ll1&linkId=${generateLinkId()}`;
      
      case 'ebay':
        return `${config.baseUrl}${productId}?campid=${config.campaignId}&toolid=10001&customid=${generateCustomId()}`;
      
      case 'walmart':
        return `${config.baseUrl}${productId}?affiliateid=${config.id}&sourceid=imp_000011112222333344&veh=aff`;
      
      case 'target':
        return `${config.baseUrl}${productId}?afid=${config.id}&ref=tgt_adv_xasd0002&AFID=${config.id}`;
      
      case 'bestbuy':
        return `${config.baseUrl}${productId}?aid=${config.id}&ref=8575135&loc=01`;
      
      default:
        return url;
    }
  } catch {
    return url;
  }
};

// Generate unique identifiers for tracking
const generateLinkId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

const generateCustomId = (): string => {
  return `itskiller_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
};

export const processAffiliateLinks = (marketplaceLinks: Product['marketplaceLinks']): Product['affiliateLinks'] => {
  if (!marketplaceLinks) return undefined;

  const affiliateLinks: Product['affiliateLinks'] = {};

  Object.entries(marketplaceLinks).forEach(([marketplace, url]) => {
    if (!url) return;

    if (marketplace in affiliateConfig) {
      affiliateLinks[marketplace] = generateAffiliateLink(url, marketplace as keyof AffiliateConfig);
    } else {
      // For unknown marketplaces, add tracking parameters
      try {
        const urlObj = new URL(url);
        urlObj.searchParams.set('ref', 'itskiller');
        urlObj.searchParams.set('utm_source', 'itskiller');
        urlObj.searchParams.set('utm_medium', 'affiliate');
        affiliateLinks[marketplace] = urlObj.toString();
      } catch {
        affiliateLinks[marketplace] = url;
      }
    }
  });

  return affiliateLinks;
};

// Revenue optimization based on commission rates
export const getOptimalMarketplace = (marketplaceLinks: Product['marketplaceLinks']): string | null => {
  if (!marketplaceLinks) return null;

  // Priority order based on typical commission rates and conversion
  const priorityOrder = ['amazon', 'target', 'bestbuy', 'walmart', 'ebay'];
  
  for (const marketplace of priorityOrder) {
    if (marketplaceLinks[marketplace]) {
      return marketplace;
    }
  }

  return Object.keys(marketplaceLinks)[0] || null;
};

// A/B testing for affiliate link optimization
export const getABTestVariant = (): 'control' | 'variant_a' | 'variant_b' => {
  const variants = ['control', 'variant_a', 'variant_b'] as const;
  const hash = getSessionId().split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return variants[Math.abs(hash) % variants.length];
};