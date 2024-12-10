import { supabase } from '../lib/supabase';
import { Product } from '../types';

export const approveProduct = async (productId: string, moderationNote?: string) => {
  const { data, error } = await supabase
    .from('products')
    .update({
      status: 'approved',
      moderation_note: moderationNote,
      approved_at: new Date().toISOString()
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
};

export const rejectProduct = async (productId: string, moderationNote: string) => {
  const { data, error } = await supabase
    .from('products')
    .update({
      status: 'rejected',
      moderation_note: moderationNote
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
};

export const getPendingProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Product[];
};