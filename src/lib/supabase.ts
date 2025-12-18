import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

if (!supabaseUrl.includes('supabase.co') || supabaseAnonKey === 'your-anon-key') {
  console.warn('⚠️ Using default Supabase credentials. Set up your own project for production use.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);