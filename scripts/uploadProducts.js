const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found in .env.local file');
  console.error('Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Trending products data
const trendingProducts = [
  {
    name: "Kulfi Falooda",
    base_price: 1831.00,
    description: "Kulfi is best described as traditional Pakistani-style ice cream. However, unlike ice cream, kulfi is not churned. This is a fantastic summer dessert.(Minimum 10 Kulfi to be ordered).",
    image_url: "https://assets.indolj.io/upload/1738392901-124A1292-.jpg",
    category: "TRENDING",
    subcategory: "TRENDING HOME",
    tag: "POPULAR",
    variants: [
      { size: "12 Pcs", price: 1830.50 },
      { size: "18 Pcs", price: 2745.76 },
      { size: "24 Pcs", price: 3661.02 }
    ]
  },
  {
    name: "Bhel Puri (100 GM)",
    base_price: 148.00,
    description: "Bhel Puri is the perfect on-the-go snack—enjoy it anytime, anywhere! It comes with two chutneys tangy tamarind and spicy green, making each bite deliciously flavorful.",
    image_url: "https://assets.indolj.io/upload/1738566527-124A3983-.jpg",
    category: "TRENDING",
    subcategory: "TRENDING HOME",
    tag: "TRENDING",
    variants: []
  },
  {
    name: "Oat Cookies",
    base_price: 186.00,
    description: "Made with premium oats, our cookies are a rich source of fiber and nutrients. Perfect for a healthy snack.",
    image_url: "https://assets.indolj.io/upload/1739010783-124A0367-.jpg",
    category: "TRENDING",
    subcategory: "TRENDING HOME",
    tag: "TRENDING",
    variants: []
  },
  {
    name: "Honey (Sidr) 250gm",
    base_price: 932.00,
    description: "Sidr honey is a premium, 100% natural honey produced by bees that collect nectar from the flowers of the Sidr tree. Renowned for its rich flavor, purity, and numerous health benefits, it is packed with antioxidants and nutrients that support immunity and overall wellness.",
    image_url: "https://assets.indolj.io/upload/1732359670-3D%20Sidr%20Web.jpg",
    category: "TRENDING",
    subcategory: "TRENDING HOME",
    tag: "TRENDING",
    variants: []
  },
  {
    name: "Honey (Natural) 250gm",
    base_price: 424.00,
    description: "Natural honey is raw, nutrient-rich, and unprocessed, offering a rich flavor and natural health benefits. Perfect as a sweetener or energy booster, it's a wholesome way to enjoy nature's finest.",
    image_url: "https://assets.indolj.io/upload/1732360062-3D%20Natrual%20Web.jpg",
    category: "TRENDING",
    subcategory: "TRENDING HOME",
    tag: null,
    variants: []
  },
  {
    name: "Three Milk Cake",
    base_price: 318.00,
    description: "A rich, moist dessert soaked in three kinds of milk and topped with whipped cream. Pure indulgence in every bite!",
    image_url: "https://assets.indolj.io/upload/1737555164-THre-mil-cake-slice.jpg",
    category: "TRENDING",
    subcategory: "TRENDING HOME",
    tag: null,
    variants: [
      { size: "250GM", price: 317.79 },
      { size: "500gm", price: 635.59 },
      { size: "1 Kg", price: 1271.19, available: false }
    ]
  }
];

async function uploadProducts() {
  console.log('Starting product upload to Supabase...');
  console.log(`Total products to upload: ${trendingProducts.length}`);

  try {
    // Insert all products in one query
    const { data, error } = await supabase
      .from('products')
      .insert(trendingProducts)
      .select();

    if (error) {
      console.error('Error uploading products:', error);
      throw error;
    }

    console.log('✅ Successfully uploaded all products!');
    console.log(`📦 Uploaded ${data.length} products`);
    console.log('\nUploaded products:');
    data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - Rs. ${product.base_price}`);
    });

    return data;
  } catch (error) {
    console.error('❌ Failed to upload products:', error.message);
    process.exit(1);
  }
}

// Run the upload
uploadProducts()
  .then(() => {
    console.log('\n✨ Upload complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
