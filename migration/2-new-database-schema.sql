-- Complete Schema for New Supabase Database
-- Run this in your new Supabase SQL Editor

-- ============================================
-- 1. CREATE PRODUCTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url TEXT,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  tag VARCHAR(50),
  variants JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 2. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory);
CREATE INDEX IF NOT EXISTS idx_products_tag ON products(tag);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. CREATE RLS POLICIES
-- ============================================

-- Allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert (for demo purposes - you can restrict this later)
CREATE POLICY "Allow public insert" ON products
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public update
CREATE POLICY "Allow public update" ON products
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow public delete
CREATE POLICY "Allow public delete" ON products
  FOR DELETE
  TO public
  USING (true);

-- ============================================
-- 5. CREATE STORAGE BUCKET FOR PRODUCT IMAGES
-- ============================================

-- Note: You'll need to create this in Supabase Dashboard > Storage
-- Bucket name: product-images
-- Make it public if you want images accessible without auth

-- After creating bucket, run these storage policies:

-- Allow public to read images
-- CREATE POLICY "Public read access"
-- ON storage.objects FOR SELECT
-- TO public
-- USING (bucket_id = 'product-images');

-- Allow public to upload images
-- CREATE POLICY "Public upload access"
-- ON storage.objects FOR INSERT
-- TO public
-- WITH CHECK (bucket_id = 'product-images');

-- Allow public to update images
-- CREATE POLICY "Public update access"
-- ON storage.objects FOR UPDATE
-- TO public
-- USING (bucket_id = 'product-images');

-- Allow public to delete images
-- CREATE POLICY "Public delete access"
-- ON storage.objects FOR DELETE
-- TO public
-- USING (bucket_id = 'product-images');

-- ============================================
-- 6. CREATE FUNCTION FOR UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- 7. CREATE TRIGGER FOR AUTO-UPDATE TIMESTAMP
-- ============================================

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SCHEMA SETUP COMPLETE!
-- ============================================
-- Next step: Run the data import script (3-import-data.js)
