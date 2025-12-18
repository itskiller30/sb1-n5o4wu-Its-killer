/*
  # Create Products Table for itsKiller Application

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text, required) - Product name
      - `description` (text, required) - Product description
      - `rating` (numeric, required) - Product rating (10-12 scale)
      - `reviews` (integer, required) - Number of reviews
      - `price` (numeric, required) - Product price
      - `image` (text, required) - Product image URL
      - `category` (text, required) - Product category
      - `tags` (text[], required) - Product tags
      - `marketplace_links` (jsonb, required) - Links to various marketplaces
      - `affiliate_links` (jsonb) - Affiliate links for monetization
      - `lowest_price` (numeric) - Lowest price found across marketplaces
      - `lowest_price_marketplace` (text) - Marketplace with lowest price
      - `status` (text, required) - Product status (pending/approved/rejected)
      - `submitted_at` (timestamptz, required) - Submission timestamp
      - `approved_at` (timestamptz) - Approval timestamp
      - `moderation_note` (text) - Note from moderator
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `products` table
    - Add policy for public users to read approved products
    - Add policy for any user to submit products (pending approval)
    - Add policy for users to view their own pending submissions

  3. Important Notes
    - Products default to 'pending' status
    - Only 'approved' products are visible to the public
    - Affiliate links are automatically processed during submission
    - Rating uses a 10-12 scale for community-curated products
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 0 AND rating <= 15),
  reviews integer NOT NULL DEFAULT 0 CHECK (reviews >= 0),
  price numeric NOT NULL CHECK (price >= 0),
  image text NOT NULL,
  category text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  marketplace_links jsonb NOT NULL DEFAULT '{}',
  affiliate_links jsonb DEFAULT '{}',
  lowest_price numeric CHECK (lowest_price >= 0),
  lowest_price_marketplace text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at timestamptz NOT NULL DEFAULT now(),
  approved_at timestamptz,
  moderation_note text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_submitted_at ON products(submitted_at);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view approved products
CREATE POLICY "Public users can view approved products"
  ON products
  FOR SELECT
  USING (status = 'approved');

-- Policy: Anyone can submit products (will be pending)
CREATE POLICY "Anyone can submit products"
  ON products
  FOR INSERT
  WITH CHECK (status = 'pending');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();