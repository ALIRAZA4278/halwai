const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Additional Classic Sweets products
const additionalClassicSweets = [
  {
    name: "Rainbow Qalaqand",
    base_price: 636.00,
    description: "The bright and cheerful colors add a touch of joy to any celebration, making Rainbow Qalqand a perfect addition to festive occasions, weddings, or as a special treat for your loved ones.",
    image_url: "https://assets.indolj.io/upload/1738224199-Rainbow-Qalaqand-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 635.59, available: true },
      { size: "1 Kg", price: 1271.18, available: false },
      { size: "2 Kg", price: 2542.36, available: false }
    ]
  },
  {
    name: "Sugar Free Qalaqand",
    base_price: 784.00,
    description: "Qalaqand is a classic South Asian sweet prepared with solidified whole milk, flavoring without sugar. Qalaqand has a flavorful lightness to it with numerous health benefits. The light sweet flavor softens up the mood.",
    image_url: "https://assets.indolj.io/upload/1738224105-Plain-Qalaqand-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 783.9, available: true },
      { size: "1 Kg", price: 1567.8, available: true },
      { size: "2 Kg", price: 3135.6, available: false }
    ]
  },
  {
    name: "Lauki Kalakand",
    base_price: 636.00,
    description: "Loki Qalaqand is prepared with all the goodness of gourd, solidified whole milk, flavoring, and sugar. Qalaqand has a flavorful lightness to it with numerous health benefits. The light sweet flavor softens up the mood.",
    image_url: "https://assets.indolj.io/upload/1738224031-Loki-Qalaqand-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 635.59, available: true },
      { size: "1 Kg", price: 1271.18, available: true },
      { size: "2 Kg", price: 2542.36, available: false }
    ]
  },
  {
    name: "Sundar Qalaqand (2 KG)",
    base_price: 3305.00,
    description: "Sunder Qalaqand, a traditional Indian delicacy that will transport you to a world of indulgence. Made with premium ingredients and perfected through generations. (Make to order)",
    image_url: "https://assets.indolj.io/upload/1738223996-124A1015-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "2 Kg", price: 3305, available: true }
    ]
  }
];

async function uploadProducts() {
  console.log('Starting additional Classic Sweets upload to Supabase...');
  console.log(`Total products to upload: ${additionalClassicSweets.length}`);

  try {
    // First, get existing products to check for duplicates
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('name, image_url')
      .eq('subcategory', 'CLASSIC SWEETS');

    if (fetchError) {
      console.error('Error fetching existing products:', fetchError);
      throw fetchError;
    }

    console.log(`\nFound ${existingProducts.length} existing Classic Sweets products in database`);

    // Filter out duplicates
    const existingNames = new Set(existingProducts.map(p => p.name.toLowerCase()));
    const existingImages = new Set(existingProducts.map(p => p.image_url));

    const productsToUpload = additionalClassicSweets.filter(product => {
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

    console.log('✅ Successfully uploaded new Classic Sweets!');
    console.log(`📦 Uploaded ${data.length} products\n`);
    console.log('Newly uploaded products:');
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
