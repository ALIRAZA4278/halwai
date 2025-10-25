-- Temporarily allow public insert access for uploading products
-- You can remove this policy after uploading if you want

-- First, drop the existing authenticated insert policy
DROP POLICY IF EXISTS "Allow authenticated insert" ON products;

-- Create new policy to allow public insert
CREATE POLICY "Allow public insert" ON products
  FOR INSERT
  TO public
  WITH CHECK (true);
