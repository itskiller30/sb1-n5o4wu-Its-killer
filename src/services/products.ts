import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { processAffiliateLinks } from '../utils/affiliate';

export const fetchProducts = async (
  category?: string,
  sortBy: 'rating' | 'price' | 'reviews' = 'rating',
  page = 1,
  limit = 12
) => {
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .eq('status', 'approved')
    .gte('rating', 10)
    .order(sortBy, { ascending: sortBy === 'price' });

  if (category && category !== 'Community') {
    query = query.eq('category', category);
  }

  if (category === 'Community') {
    query = query.order('reviews', { ascending: false });
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw error;
  }

  return {
    products: data as Product[],
    total: count || 0
  };
};

export const submitProduct = async (product: Omit<Product, 'id'>) => {
  const affiliateLinks = processAffiliateLinks(product.marketplaceLinks);

  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        ...product,
        affiliate_links: affiliateLinks,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Product;
};