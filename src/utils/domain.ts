import { Product } from '../types';

export const DOMAIN = 'itskiller.com';

export const isValidDomain = (url: string): boolean => {
  try {
    const hostname = new URL(url).hostname;
    return hostname === DOMAIN;
  } catch {
    return false;
  }
};

export const formatProductUrl = (product: Product): string => {
  return `https://${DOMAIN}/product/${product.id}`;
};