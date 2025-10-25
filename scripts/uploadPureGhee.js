const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Pure Ghee products data
const pureGheeProducts = [
  {
    name: "Pure Ghee",
    base_price: 1203.00,
    description: "Pure Ghee is prepared by simmering butter, which is churned from cream, skimming any impurities from the surface, and then pouring and retaining the clear, still liquid.",
    image_url: "https://assets.indolj.io/upload/1738566694-124A4003-.jpg",
    category: "SWEETS",
    subcategory: "PURE GHEE",
    tag: null,
    variants: [
      { size: "400GM", price: 1203.39, available: false },
      { size: "2 Lbs", price: 2364.4, available: true },
      { size: "4lbs", price: 4584.74, available: false }
    ]
  }
];

async function uploadProducts() {
  console.log('Starting Pure Ghee products upload to Supabase...');
  console.log(`Total products to upload: ${pureGheeProducts.length}`);

  try {
    // First, delete the old Pure Ghee from DAIRY subcategory
    console.log('\nDeleting old Pure Ghee from DAIRY subcategory...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('name', 'Pure Ghee')
      .eq('subcategory', 'DAIRY');

    if (deleteError) {
      console.error('Error deleting old product:', deleteError);
    } else {
      console.log('✅ Old Pure Ghee deleted from DAIRY');
    }

    // Check for existing products in PURE GHEE subcategory
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('name, image_url')
      .eq('subcategory', 'PURE GHEE');

    if (fetchError) {
      console.error('Error fetching existing products:', fetchError);
      throw fetchError;
    }

    console.log(`\nFound ${existingProducts.length} existing Pure Ghee products in database`);

    // Filter out duplicates
    const existingNames = new Set(existingProducts.map(p => p.name.toLowerCase()));
    const existingImages = new Set(existingProducts.map(p => p.image_url));

    const productsToUpload = pureGheeProducts.filter(product => {
      const isDuplicateName = existingNames.has(product.name.toLowerCase());
      const isDuplicateImage = existingImages.has(product.image_url);

      if (isDuplicateName || isDuplicateImage) {
        console.log(`⏭️  Skipping duplicate: ${product.name}`);
        return false;
      }
      return true;
    });

    if (productsToUpload.length === 0) {
      console.log('\n✨ No new products to upload - all products already exist!');
      return;
    }

    console.log(`\n📦 Uploading ${productsToUpload.length} new products...\n`);

    const { data, error } = await supabase
      .from('products')
      .insert(productsToUpload)
      .select();

    if (error) {
      console.error('Error uploading products:', error);
      throw error;
    }

    console.log('✅ Successfully uploaded Pure Ghee products!');
    console.log(`📦 Uploaded ${data.length} products\n`);
    console.log('Uploaded products:');
    data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - Rs. ${product.base_price}`);
    });

    return data;
  } catch (error) {
    console.error('❌ Failed to upload products:', error.message);
    process.exit(1);
  }
}

uploadProducts()
  .then(() => {
    console.log('\n✨ Upload complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
