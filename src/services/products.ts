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

  const products = data?.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    rating: item.rating,
    reviews: item.reviews,
    price: item.price,
    image: item.image,
    category: item.category,
    tags: item.tags || [],
    marketplaceLinks: item.marketplace_links || {},
    affiliateLinks: item.affiliate_links || {},
    lowestPrice: item.lowest_price,
    lowestPriceMarketplace: item.lowest_price_marketplace,
    status: item.status,
    submittedAt: item.submitted_at,
    approvedAt: item.approved_at,
    moderationNote: item.moderation_note
  })) || [];

  return {
    products: products as Product[],
    total: count || 0
  };
};

export const submitProduct = async (product: Omit<Product, 'id'>) => {
  const affiliateLinks = processAffiliateLinks(product.marketplaceLinks);

  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        name: product.name,
        description: product.description,
        rating: product.rating,
        reviews: product.reviews,
        price: product.price,
        image: product.image,
        category: product.category,
        tags: product.tags,
        marketplace_links: product.marketplaceLinks,
        affiliate_links: affiliateLinks,
        lowest_price: product.lowestPrice,
        lowest_price_marketplace: product.lowestPriceMarketplace,
        status: 'pending',
        submitted_at: product.submittedAt,
        approved_at: product.approvedAt,
        moderation_note: product.moderationNote
      }
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as any;
};