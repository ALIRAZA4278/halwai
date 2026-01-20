-- ============================================
-- COMPLETE DATABASE SCHEMA FOR halwaiii APP
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. CATEGORIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  display_name VARCHAR(100) NOT NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access" ON categories
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert" ON categories
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public update" ON categories
  FOR UPDATE TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete" ON categories
  FOR DELETE TO public USING (true);

-- ============================================
-- 2. SUBCATEGORIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS subcategories (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(category_id, name)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_subcategories_display_order ON subcategories(display_order);

-- Enable RLS
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access" ON subcategories
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert" ON subcategories
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public update" ON subcategories
  FOR UPDATE TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete" ON subcategories
  FOR DELETE TO public USING (true);

-- ============================================
-- 3. ORDERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20) NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_location VARCHAR(255),
  delivery_date DATE NOT NULL,
  delivery_time VARCHAR(50),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  items JSONB NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_delivery_date ON orders(delivery_date);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access" ON orders
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert" ON orders
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public update" ON orders
  FOR UPDATE TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete" ON orders
  FOR DELETE TO public USING (true);

-- ============================================
-- 4. CREATE UPDATE TRIGGERS
-- ============================================

-- Categories trigger
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Subcategories trigger
CREATE TRIGGER update_subcategories_updated_at
  BEFORE UPDATE ON subcategories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Orders trigger
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. INSERT DEFAULT CATEGORIES
-- ============================================

INSERT INTO categories (name, display_name, image_url, display_order) VALUES
('SWEETS', 'Sweets', '/Category/1.png', 1),
('BAKERY', 'Bakery', '/Category/3.png', 2),
('GIFT BOX', 'Gift Box', '/Category/6.png', 3),
('PACKED ITEMS', 'Packed Items', '/Category/7.png', 4)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 6. INSERT DEFAULT SUBCATEGORIES
-- ============================================

-- Get category IDs and insert subcategories
DO $$
DECLARE
  sweets_id INTEGER;
  bakery_id INTEGER;
  giftbox_id INTEGER;
BEGIN
  -- Get category IDs
  SELECT id INTO sweets_id FROM categories WHERE name = 'SWEETS';
  SELECT id INTO bakery_id FROM categories WHERE name = 'BAKERY';
  SELECT id INTO giftbox_id FROM categories WHERE name = 'GIFT BOX';

  -- Insert subcategories for SWEETS
  INSERT INTO subcategories (category_id, name, display_name, display_order) VALUES
  (sweets_id, 'CLASSIC SWEETS', 'Classic Sweets', 1),
  (sweets_id, 'BAKLAVA', 'Baklava', 2),
  (sweets_id, 'HALWA JAAT', 'Halwa Jaat', 3),
  (sweets_id, 'PREMIUM SWEETS', 'Premium Sweets', 4),
  (sweets_id, 'PRE-ORDER', 'Pre-Order', 5)
  ON CONFLICT DO NOTHING;

  -- Insert subcategories for BAKERY
  INSERT INTO subcategories (category_id, name, display_name, display_order) VALUES
  (bakery_id, 'TEA TIME', 'Tea Time', 1),
  (bakery_id, 'BREAKFAST', 'Breakfast', 2)
  ON CONFLICT DO NOTHING;

  -- Insert subcategories for GIFT BOX
  INSERT INTO subcategories (category_id, name, display_name, display_order) VALUES
  (giftbox_id, 'PRE ORDER BOXES', 'Pre Order Boxes', 1),
  (giftbox_id, 'SPECIAL BOXES', 'Special Boxes', 2),
  (giftbox_id, 'BABY GIRL BOXES', 'Baby Girl Boxes', 3),
  (giftbox_id, 'BABY BOY BOXES', 'Baby Boy Boxes', 4)
  ON CONFLICT DO NOTHING;
END $$;

-- ============================================
-- SCHEMA SETUP COMPLETE!
-- ============================================
