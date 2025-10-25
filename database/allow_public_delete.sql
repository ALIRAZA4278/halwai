-- Allow public delete on products table
DROP POLICY IF EXISTS "Allow public delete" ON products;

CREATE POLICY "Allow public delete"
ON products
FOR DELETE
TO public
USING (true);
