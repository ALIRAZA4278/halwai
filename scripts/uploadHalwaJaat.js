const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Halwa Jaat products data
const halwaJaatProducts = [
  {
    name: "Akhrot Halwa",
    base_price: 881.00,
    description: "Indulge in the richness of Walnut Halwa, a sweet delicacy that combines the smoothness of halwa with the nutty goodness of walnuts.",
    image_url: "https://assets.indolj.io/upload/1684999936-3A1A3185.JPG",
    category: "SWEETS",
    subcategory: "HALWA JAAT",
    tag: null,
    variants: [
      { size: "Half Kg", price: 881.35, available: true },
      { size: "1 Kg", price: 1762.71, available: true },
      { size: "2 Kg", price: 3525.42, available: false }
    ]
  },
  {
    name: "Habshi Halwa",
    base_price: 669.00,
    description: "Habshi Halwa is a delectable sticky sweet delight that originated in Hyderabad, India. It is made out of milk, sugar and cardamom as its key ingredients.",
    image_url: "https://assets.indolj.io/upload/1739612637-Habshi-Halwa-.jpg",
    category: "SWEETS",
    subcategory: "HALWA JAAT",
    tag: null,
    variants: [
      { size: "Half Kg", price: 669.48, available: true },
      { size: "1 Kg", price: 1338.97, available: true },
      { size: "2 Kg", price: 2677.94, available: false }
    ]
  },
  {
    name: "Kaju Halwa",
    base_price: 949.00,
    description: "Kaju Pak or Kaju Halwa is a dessert which is made with using some flour, nuts, lentils, sugar and ghee with Cashew nuts as its main ingredient.",
    image_url: "https://assets.indolj.io/upload/1738320687-Kaju-Pak--.jpg",
    category: "SWEETS",
    subcategory: "HALWA JAAT",
    tag: null,
    variants: [
      { size: "Half Kg", price: 949.15, available: true },
      { size: "1 Kg", price: 1898.31, available: true },
      { size: "2 Kg", price: 3796.61, available: false }
    ]
  },
  {
    name: "Badam Halwa",
    base_price: 907.00,
    description: "Badam Halwa is a regal dessert fit for Kings! This exuberant delight is made from a mix of finely grounded almonds with milk, khoya and sugar.",
    image_url: "https://assets.indolj.io/upload/1738320655-Badam-Pak-.jpg",
    category: "SWEETS",
    subcategory: "HALWA JAAT",
    tag: null,
    variants: [
      { size: "Half Kg", price: 906.77, available: true },
      { size: "1 Kg", price: 1813.55, available: true },
      { size: "2 Kg", price: 3627.1, available: false }
    ]
  },
  {
    name: "Pista Halwa",
    base_price: 949.00,
    description: "Pista Pak or Pista Halwa having a mild colour and nutty crunchy taste is a treat for the taste buds. Cardamom powder blends perfectly with the ground pistachios to give the halwa its lip-smacking taste.",
    image_url: "https://assets.indolj.io/upload/1738320568-Pista-Pak-.jpg",
    category: "SWEETS",
    subcategory: "HALWA JAAT",
    tag: null,
    variants: [
      { size: "Half Kg", price: 949.15, available: true },
      { size: "1 Kg", price: 1889.93, available: true },
      { size: "2 Kg", price: 3797.6, available: false }
    ]
  },
  {
    name: "Honey Dry Fruit Halwa",
    base_price: 1335.00,
    description: "A delightful mix of assorted dry fruit mixed with honey.",
    image_url: "https://assets.indolj.io/upload/1738320556-Honey-Dryfruit-.jpg",
    category: "SWEETS",
    subcategory: "HALWA JAAT",
    tag: null,
    variants: [
      { size: "Half Kg", price: 1334.74, available: true },
      { size: "1 Kg", price: 2669.49, available: false }
    ]
  },
  {
    name: "Karachi Halwa",
    base_price: 669.00,
    description: "Karachi Halwa is a colorful and soft delight that resembles marshmallow in texture and much tastier than any other sweet you've ever tasted.",
    image_url: "https://assets.indolj.io/upload/1738320541-Karachi-Halwa-(2)-.jpg",
    category: "SWEETS",
    subcategory: "HALWA JAAT",
    tag: null,
    variants: [
      { size: "Half Kg", price: 669.49, available: true },
      { size: "1 Kg", price: 1338.98, available: true },
      { size: "2 Kg", price: 2677.94, available: false }
    ]
  },
  {
    name: "Injeer Halwa",
    base_price: 881.00,
    description: "Injeer Halwa is a striking dessert made of pured figs, powdered almonds and milk powdered, cooked in ghee and a little bit of sugar.",
    image_url: "https://assets.indolj.io/upload/1751355092-Anjeer-Halwa.jpg",
    category: "SWEETS",
    subcategory: "HALWA JAAT",
    tag: null,
    variants: [
      { size: "Half Kg", price: 881.35, available: true },
      { size: "1 Kg", price: 1762.71, available: true },
      { size: "2 Kg", price: 3525.42, available: false }
    ]
  },
  {
    name: "Sohan Halwa",
    base_price: 881.00,
    description: "Unlike most other halwa dishes in the subcontinent, Sohan Halwa holds a unique and tempting taste, texture and flavor. Its a traditional dessert with a variety of dense sweet confection or halwa.",
    image_url: "https://assets.indolj.io/upload/1738320463-Sohan-Halwa-.jpg",
    category: "SWEETS",
    subcategory: "HALWA JAAT",
    tag: null,
    variants: [
      { size: "Half Kg", price: 881.35, available: true },
      { size: "1 Kg", price: 1762.71, available: true },
      { size: "2 Kg", price: 3525.42, available: false }
    ]
  }
];

async function uploadProducts() {
  console.log('Starting Halwa Jaat products upload to Supabase...');
  console.log(`Total products to upload: ${halwaJaatProducts.length}`);

  try {
    // Check for existing products
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('name, image_url')
      .eq('subcategory', 'HALWA JAAT');

    if (fetchError) {
      console.error('Error fetching existing products:', fetchError);
      throw fetchError;
    }

    console.log(`\nFound ${existingProducts.length} existing Halwa Jaat products in database`);

    // Filter out duplicates
    const existingNames = new Set(existingProducts.map(p => p.name.toLowerCase()));
    const existingImages = new Set(existingProducts.map(p => p.image_url));

    const productsToUpload = halwaJaatProducts.filter(product => {
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

    console.log('✅ Successfully uploaded Halwa Jaat products!');
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
