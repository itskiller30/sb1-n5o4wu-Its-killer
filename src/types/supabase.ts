export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          price: number
          rating: number
          reviews: number
          image: string
          category: string
          tags: string[]
          marketplace_links: Json
          affiliate_links: Json
          lowest_price: number | null
          lowest_price_marketplace: string | null
          status: 'pending' | 'approved' | 'rejected'
          moderation_note: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          price: number
          rating?: number
          reviews?: number
          image: string
          category: string
          tags?: string[]
          marketplace_links: Json
          affiliate_links?: Json
          lowest_price?: number | null
          lowest_price_marketplace?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          moderation_note?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          price?: number
          rating?: number
          reviews?: number
          image?: string
          category?: string
          tags?: string[]
          marketplace_links?: Json
          affiliate_links?: Json
          lowest_price?: number | null
          lowest_price_marketplace?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          moderation_note?: string | null
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          is_moderator: boolean
        }
        Insert: {
          id: string
          created_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          is_moderator?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          is_moderator?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}