const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const breakfastProducts = [
  {
    name: "Bran Bread (Medium) (100g)",
    description: "Bran bread is a wholesome and nutritious bread that's packed with the goodness of bran. Made with whole wheat flour and added bran, our Bran Bread offers a delicious and satisfying way to incorporate fiber and nutrients into your diet.",
    category: "BAKERY",
    subcategory: "BREAKFAST",
    base_price: 120,
    image_url: "https://assets.indolj.io/upload/1740654464-124A9952-.jpg",
    variants: []
  },
  {
    name: "Cake Rusk",
    description: "Our Cake Rusk is a perfect choice. Its timeless appeal and irresistible taste will leave you wanting more.",
    category: "BAKERY",
    subcategory: "BREAKFAST",
    base_price: 288,
    image_url: "https://assets.indolj.io/upload/1740468266-Cake-Rusk.jpg-.jpg",
    variants: [
      { size: "250GM", price: 288.25, available: true },
      { size: "Half Kg", price: 576.5, available: true },
      { size: "1 Kg", price: 1153.01, available: true }
    ]
  },
  {
    name: "Plain Bread",
    description: "Made with high-quality ingredients and expertly baked, our Plain Bread offers a light and airy texture. Our Plain Bread is a soft and fluffy loaf that serves as the perfect base for your favorite sandwiches, toasts, and more.",
    category: "BAKERY",
    subcategory: "BREAKFAST",
    base_price: 80,
    image_url: "https://assets.indolj.io/upload/1740654410-124A9933-.jpg",
    variants: [
      { size: "small", price: 80, available: false },
      { size: "medium", price: 110, available: true },
      { size: "large", price: 170, available: true }
    ]
  },
  {
    name: "Round Rusk (225 GM)",
    description: "Round Rusk is a delightful baked snack that combines a satisfying crunch with a hint of sweetness. These round-shaped rusks are expertly baked to perfection.",
    category: "BAKERY",
    subcategory: "BREAKFAST",
    base_price: 102,
    image_url: "https://assets.indolj.io/upload/1740653564-124A0044-.jpg",
    variants: []
  },
  {
    name: "Ginger and Garlic Rusk (225 GM)",
    description: "Experience the burst of garlic flavor and the satisfying crunch of our Garlic Rusk. It's a savory treat that will tantalize your taste buds and leave you craving for more.",
    category: "BAKERY",
    subcategory: "BREAKFAST",
    base_price: 136,
    image_url: "https://assets.indolj.io/upload/1740653539-124A0040-.jpg",
    variants: []
  },
  {
    name: "Slice Rusk (225 GM)",
    description: "Whether you're looking for a quick breakfast option or a delightful snack to curb your hunger, our Rusk is a perfect choice.",
    category: "BAKERY",
    subcategory: "BREAKFAST",
    base_price: 102,
    image_url: "https://assets.indolj.io/upload/1740653271-124A0029-.jpg",
    variants: []
  },
  {
    name: "Hard Bread",
    description: "Crisp and firm textured bread, ideal for dipping, toasting, or enjoying with tea. A classic choice for those who love a hearty crunch.",
    category: "BAKERY",
    subcategory: "BREAKFAST",
    base_price: 100,
    image_url: "https://assets.indolj.io/upload/1758193761-WhatsApp%20Image%202025-09-18%20at%2016.08.30_8ff62cf0.jpg",
    variants: []
  },
  {
    name: "Burger Rusk",
    description: "Crispy, golden-baked burger rusks with a perfect crunch, ideal for tea-time or snacking.",
    category: "BAKERY",
    subcategory: "BREAKFAST",
    base_price: 102,
    image_url: "https://assets.indolj.io/upload/1758867214-124A0094_resized.jpg",
    variants: []
  }
];

async function uploadBreakfastProducts() {
  console.log('Starting to upload breakfast products...');

  for (const product of breakfastProducts) {
    try {
      // Check if product already exists
      const { data: existingProduct, error: checkError } = await supabase
        .from('products')
        .select('id')
        .eq('name', product.name)
        .eq('subcategory', 'BREAKFAST')
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

  console.log('\nBreakfast products upload complete!');
}

uploadBreakfastProducts();
