const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const premioCakesProducts = [
  {
    name: "Premio Chocolate Nutella Cake",
    description: "Nutella Cake, a heavenly delight for all chocolate and hazelnut lovers. This delectable cake features layers of moist chocolate sponge generously filled and frosted with creamy Nutella frosting.",
    category: "CAKES & PASTRIES",
    subcategory: "PREMIO CAKES",
    base_price: 1136,
    image_url: "https://assets.indolj.io/upload/1737363683-Premio-Nutella-Cake-.jpg",
    variants: [
      { size: "1 Lbs", price: 1135.6, available: false },
      { size: "2 Lbs", price: 2169.495, available: false }
    ]
  },
  {
    name: "Three Milk Cake",
    description: "A rich, moist dessert soaked in three kinds of milk and topped with whipped cream. Pure indulgence in every bite!",
    category: "CAKES & PASTRIES",
    subcategory: "PREMIO CAKES",
    base_price: 318,
    image_url: "https://assets.indolj.io/upload/1737555164-THre-mil-cake-slice.jpg",
    variants: [
      { size: "250GM", price: 317.79, available: true },
      { size: "500gm", price: 635.59, available: true },
      { size: "1 Kg", price: 1271.19, available: true }
    ]
  }
];

async function uploadPremioCakesProducts() {
  console.log('Starting to upload Premio Cakes products...');

  for (const product of premioCakesProducts) {
    try {
      // Check if product already exists
      const { data: existingProduct, error: checkError } = await supabase
        .from('products')
        .select('id')
        .eq('name', product.name)
        .eq('subcategory', 'PREMIO CAKES')
        .single();

      if (existingProduct) {
        console.log(`Product "${product.name}" already exists. Skipping...`);
        continue;
      }

      // Insert the product
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();

      if (error) {
        console.error(`Error uploading ${product.name}:`, error);
      } else {
        console.log(`✓ Successfully uploaded: ${product.name}`);
      }
    } catch (err) {
      console.error(`Error processing ${product.name}:`, err);
    }
  }

  console.log('\nPremio Cakes products upload complete!');
}

uploadPremioCakesProducts();
