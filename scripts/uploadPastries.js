const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const pastriesProducts = [
  {
    name: "Cadbury Brownie",
    description: "Our Nutella Brownie is made with a generous swirl of creamy Nutella, this moist and fudgy brownie is a chocolate lover's dream.",
    category: "CAKES & PASTRIES",
    subcategory: "PASTRIES",
    base_price: 153,
    image_url: "https://assets.indolj.io/upload/1738393071-124A1224-.jpg",
    variants: []
  },
  {
    name: "Nutella Brownie",
    description: "Our Nutella Brownie is made with a generous swirl of creamy Nutella, this moist and fudgy brownie is a chocolate lover's dream.",
    category: "CAKES & PASTRIES",
    subcategory: "PASTRIES",
    base_price: 153,
    image_url: "https://assets.indolj.io/upload/1738566466-124A1222-.jpg",
    variants: []
  },
  {
    name: "Brownie",
    description: "Brownie is a rich and fudgy treat is baked to perfection the intense chocolate flavor and melt-in-your-mouth texture envelop your senses. Savor the pure bliss of our delectable Brownie.",
    category: "CAKES & PASTRIES",
    subcategory: "PASTRIES",
    base_price: 68,
    image_url: "https://assets.indolj.io/upload/1738566454-124A4019-.jpg",
    variants: [
      { size: "small", price: 67.8, available: true },
      { size: "large", price: 84.74, available: true }
    ]
  },
  {
    name: "Chocolate Heaven & Desire Pastry",
    description: "Rich, moist chocolate pastry layered with creamy frosting and topped with chocolate shavings — a heavenly treat for chocolate lovers.",
    category: "CAKES & PASTRIES",
    subcategory: "PASTRIES",
    base_price: 153,
    image_url: "https://assets.indolj.io/upload/1755345174-Heaven-Pastry.jpg",
    variants: []
  },
  {
    name: "Black Forest Pastry",
    description: "A decadent layered pastry made with rich chocolate sponge, fresh whipped cream, and topped with juicy cherries and chocolate shavings for a classic Black Forest indulgence.",
    category: "CAKES & PASTRIES",
    subcategory: "PASTRIES",
    base_price: 85,
    image_url: "https://assets.indolj.io/upload/1758793208-124A1195_800x800.jpg",
    variants: []
  },
  {
    name: "Chocolate Fudge Pastry",
    description: "A rich, moist chocolate sponge layered with decadent chocolate fudge and topped with smooth chocolate ganache for the ultimate chocolate lover's delight.",
    category: "CAKES & PASTRIES",
    subcategory: "PASTRIES",
    base_price: 110,
    image_url: "https://assets.indolj.io/upload/1758793891-124A1202_800x800.jpg",
    variants: []
  }
];

async function uploadPastriesProducts() {
  console.log('Starting to upload Pastries products...');

  for (const product of pastriesProducts) {
    try {
      // Check if product already exists
      const { data: existingProduct, error: checkError } = await supabase
        .from('products')
        .select('id')
        .eq('name', product.name)
        .eq('subcategory', 'PASTRIES')
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

  console.log('\nPastries products upload complete!');
}

uploadPastriesProducts();
