const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Baklava products data
const baklavaProducts = [
  {
    name: "Baklava Stick Roll",
    base_price: 644.00,
    description: "Delight in the elegance of our stick Baklava adorned with a touch of honey. A refined treat that satisfies both the eyes and the taste buds.",
    image_url: "https://assets.indolj.io/upload/1738320413-Stick-Baklava-.jpg",
    category: "SWEETS",
    subcategory: "BAKLAVA",
    tag: null,
    variants: [
      { size: "Half Kg", price: 644.06, available: true },
      { size: "1 Kg", price: 1288.13, available: false },
      { size: "2 Kg", price: 2576.26, available: false }
    ]
  },
  {
    name: "Arabic Baklava",
    base_price: 932.00,
    description: "Arabic Baklava is a captivating sweet treat that embodies the rich flavors of the Middle East. With its sumptuous layers of flaky pastry, this delicacy unveils a delightful surprise at its center – a generous filling of exquisite dry fruits.",
    image_url: "https://assets.indolj.io/upload/1738577288-Arabic-Baklava-.jpg",
    category: "SWEETS",
    subcategory: "BAKLAVA",
    tag: null,
    variants: [
      { size: "Half Kg", price: 932.2, available: true },
      { size: "1 Kg", price: 1864.4, available: false },
      { size: "2 Kg", price: 3728.08, available: false }
    ]
  },
  {
    name: "Chutki Baklava",
    base_price: 644.00,
    description: "Chutki Baklava is a bite-sized delight that takes the irresistible flavors of traditional baklava and presents them in a charming and convenient form.",
    image_url: "https://assets.indolj.io/upload/1738320401-Chutki-Baklava-.jpg",
    category: "SWEETS",
    subcategory: "BAKLAVA",
    tag: null,
    variants: [
      { size: "Half Kg", price: 644.06, available: true },
      { size: "1 Kg", price: 1288.13, available: false },
      { size: "2 Kg", price: 2576.26, available: false }
    ]
  },
  {
    name: "Kaju Baklava",
    base_price: 644.00,
    description: "Kaju Baklava is a divine dessert that merges the indulgent flavors of cashews and flaky pastry.",
    image_url: "https://assets.indolj.io/upload/1738320382-Kaju-Baklava-.jpg",
    category: "SWEETS",
    subcategory: "BAKLAVA",
    tag: null,
    variants: [
      { size: "Half Kg", price: 644.06, available: true },
      { size: "1 Kg", price: 1288.13, available: false },
      { size: "2 Kg", price: 2576.26, available: false }
    ]
  },
  {
    name: "Tai Baklava",
    base_price: 644.00,
    description: "Treat yourself to the heavenly delight of Tai Baklava today and embark on a journey of pure culinary bliss.",
    image_url: "https://assets.indolj.io/upload/1738320369-Tai-Baklava-.jpg",
    category: "SWEETS",
    subcategory: "BAKLAVA",
    tag: null,
    variants: [
      { size: "Half Kg", price: 644.06, available: true },
      { size: "1 Kg", price: 1288.13, available: false },
      { size: "2 Kg", price: 2576.26, available: false }
    ]
  },
  {
    name: "Khajoor Baklava",
    base_price: 644.00,
    description: "Khajoor Baklava is a type of the famous Arabic sweet, Baklava. This delicacy is filled with khajoor. This sweet is rich in nutrition and taste and cut in the shape of rolls.",
    image_url: "https://assets.indolj.io/upload/1738320354-Khajoor-Baklava-.jpg",
    category: "SWEETS",
    subcategory: "BAKLAVA",
    tag: null,
    variants: [
      { size: "Half Kg", price: 644.06, available: true },
      { size: "1 Kg", price: 1288.13, available: false },
      { size: "2 Kg", price: 2576.26, available: false }
    ]
  },
  {
    name: "Mix Baklava",
    base_price: 644.00,
    description: "An assorted collection of crispy, flaky baklava pieces layered with nuts and sweet syrup — a perfect blend of taste and tradition.",
    image_url: "https://assets.indolj.io/upload/1755328429-Mix-Baklava.jpg",
    category: "SWEETS",
    subcategory: "BAKLAVA",
    tag: null,
    variants: [
      { size: "Half Kg", price: 644.07, available: true },
      { size: "1 Kg", price: 1288.14, available: false },
      { size: "2 Kg", price: 2576.28, available: false }
    ]
  },
  {
    name: "Chocolate Baklava",
    base_price: 644.00,
    description: "A rich twist on a Middle Eastern classic — our Chocolate Baklava is made with delicate layers of crisp pastry filled with a nutty chocolate blend, drizzled with chocolate syrup, and topped with a sprinkle of crushed nuts. Buttery, crunchy, and irresistibly indulgent, it's the perfect fusion of tradition and modern flavor.",
    image_url: "https://assets.indolj.io/upload/1756891139-1.2.jpg",
    category: "SWEETS",
    subcategory: "BAKLAVA",
    tag: null,
    variants: [
      { size: "Half Kg", price: 644.07, available: true },
      { size: "1 Kg", price: 1288.14, available: false },
      { size: "2 Kg", price: 2576.28, available: false }
    ]
  },
  {
    name: "Almond Baklava",
    base_price: 644.00,
    description: "Delicate layers of golden, flaky filo pastry filled with a rich almond mixture and drizzled with fragrant honey syrup — our Almond Baklava is a perfect harmony of crunch and sweetness. Topped with slivered almonds for extra nutty goodness, this Middle Eastern classic is a luxurious treat for any occasion.",
    image_url: "https://assets.indolj.io/upload/1758012467-124A4036_800x800.jpg",
    category: "SWEETS",
    subcategory: "BAKLAVA",
    tag: null,
    variants: [
      { size: "Half Kg", price: 644, available: true },
      { size: "1 Kg", price: 1288, available: false },
      { size: "2 Kg", price: 2576, available: false }
    ]
  }
];

async function uploadProducts() {
  console.log('Starting Baklava products upload to Supabase...');
  console.log(`Total products to upload: ${baklavaProducts.length}`);

  try {
    // Check for existing products
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('name, image_url')
      .eq('subcategory', 'BAKLAVA');

    if (fetchError) {
      console.error('Error fetching existing products:', fetchError);
      throw fetchError;
    }

    console.log(`\nFound ${existingProducts.length} existing Baklava products in database`);

    // Filter out duplicates
    const existingNames = new Set(existingProducts.map(p => p.name.toLowerCase()));
    const existingImages = new Set(existingProducts.map(p => p.image_url));

    const productsToUpload = baklavaProducts.filter(product => {
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

    console.log('✅ Successfully uploaded Baklava products!');
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
