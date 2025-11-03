const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const freshCreamProducts = [
  {
    name: "Chocolate World Class Mousse Cake",
    description: "This heavenly dessert is a masterpiece of rich, velvety chocolate mousse elegantly nestled between layers of moist and decadent chocolate cake, our Chocolate Mousse Cake is sure to leave you craving for more.",
    category: "CAKES & PASTRIES",
    subcategory: "FRESH CREAM",
    base_price: 1271,
    image_url: "https://assets.indolj.io/upload/1737540460-Chocolate-Mousse-.jpg",
    variants: []
  },
  {
    name: "Milk Fy Cake",
    description: "Experience pure bliss with our Milk Fy Cake, a delightful creation that brings together the goodness of milk and the heavenly flavors of a moist and fluffy cake.",
    category: "CAKES & PASTRIES",
    subcategory: "FRESH CREAM",
    base_price: 636,
    image_url: "https://assets.indolj.io/upload/1737540438-Milkfy-Cake-.jpg",
    variants: [
      { size: "1 Lbs", price: 635.59, available: true },
      { size: "2 Lbs", price: 1271.18, available: true }
    ]
  },
  {
    name: "Pineapple Gateau Cake",
    description: "Delight in the tropical goodness of our Pineapple Gateau Cake, Each bite is a burst of refreshing sweetness, complemented by the tangy notes of juicy pineapple chunks.",
    category: "CAKES & PASTRIES",
    subcategory: "FRESH CREAM",
    base_price: 585,
    image_url: "https://assets.indolj.io/upload/1738568125-Pineapple-Gateu-.jpg",
    variants: [
      { size: "1 Lbs", price: 584.74, available: true },
      { size: "2 Lbs", price: 1169.49, available: true }
    ]
  },
  {
    name: "Coffee Crunch Cake",
    description: "This delectable treat features a moist and fluffy cake infused with the rich aroma of coffee. What sets it apart is the delightful addition of caramel chunks that add a luscious sweetness and a satisfying crunch.",
    category: "CAKES & PASTRIES",
    subcategory: "FRESH CREAM",
    base_price: 585,
    image_url: "https://assets.indolj.io/upload/1737540410-Coffee-Crunch-.jpg",
    variants: [
      { size: "1 Lbs", price: 584.74, available: true },
      { size: "2 Lbs", price: 1169.49, available: true }
    ]
  },
  {
    name: "Black Forest Cake",
    description: "Each bite of Black Forest cake reveals a perfect balance of rich chocolate, creamy sweetness, and tangy fruitiness.",
    category: "CAKES & PASTRIES",
    subcategory: "FRESH CREAM",
    base_price: 585,
    image_url: "https://assets.indolj.io/upload/1737540387-Black-forest-Cake-.jpg",
    variants: [
      { size: "1 Lbs", price: 584.74, available: true },
      { size: "2 Lbs", price: 1169.49, available: true }
    ]
  },
  {
    name: "American Trifle Cake",
    description: "This delightful cake is a symphony of moist vanilla sponge cake, luscious custard, fresh berries, and velvety whipped cream.",
    category: "CAKES & PASTRIES",
    subcategory: "FRESH CREAM",
    base_price: 585,
    image_url: "https://assets.indolj.io/upload/1737540378-American-Trifle-Cake-.jpg",
    variants: [
      { size: "1 Lbs", price: 584.74, available: true },
      { size: "2 Lbs", price: 1169.49, available: true }
    ]
  },
  {
    name: "Chocolate Fudge Cake",
    description: "Our chocolate fudge cake is moist, rich, and intensely chocolatey. Each slice is layered with luscious chocolate fudge frosting.",
    category: "CAKES & PASTRIES",
    subcategory: "FRESH CREAM",
    base_price: 636,
    image_url: "https://assets.indolj.io/upload/1737540363-Chocolate-Fudge-.jpg",
    variants: [
      { size: "1 Lbs", price: 635.59, available: true },
      { size: "2 Lbs", price: 1271.19, available: true }
    ]
  },
  {
    name: "Chocolate Chip Cake",
    description: "Experience pure bliss with our decadent Chocolate Chip Cake. This heavenly creation is a chocolate lover's dream come true.",
    category: "CAKES & PASTRIES",
    subcategory: "FRESH CREAM",
    base_price: 585,
    image_url: "https://assets.indolj.io/upload/1737540352-124A1708-.jpg",
    variants: [
      { size: "1 Lbs", price: 584.74, available: true },
      { size: "2 Lbs", price: 1169.49, available: true }
    ]
  },
  {
    name: "Pineapple Cake",
    description: "A soft and fluffy sponge cake layered with whipped cream, topped with juicy pineapple slices and bright red cherries for a refreshing tropical flavor. Perfect for celebrations and sweet cravings alike.",
    category: "CAKES & PASTRIES",
    subcategory: "FRESH CREAM",
    base_price: 585,
    image_url: "https://assets.indolj.io/upload/1737540341-Pneapple-Cake-.jpg",
    variants: [
      { size: "1 Lbs", price: 584.74, available: false },
      { size: "2 Lbs", price: 1169.49, available: true }
    ]
  },
  {
    name: "Chocolate Heaven Cake 900g",
    description: "A rich, indulgent chocolate cake layered with creamy chocolate frosting and topped with delicate chocolate shavings. Perfect for true chocolate lovers looking for a decadent treat.",
    category: "CAKES & PASTRIES",
    subcategory: "FRESH CREAM",
    base_price: 1271,
    image_url: "https://assets.indolj.io/upload/1758267894-124A1784_800x800.jpg",
    variants: []
  }
];

async function uploadFreshCreamProducts() {
  console.log('Starting to upload Fresh Cream products...');

  for (const product of freshCreamProducts) {
    try {
      // Check if product already exists
      const { data: existingProduct, error: checkError } = await supabase
        .from('products')
        .select('id')
        .eq('name', product.name)
        .eq('subcategory', 'FRESH CREAM')
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

  console.log('\nFresh Cream products upload complete!');
}

uploadFreshCreamProducts();
