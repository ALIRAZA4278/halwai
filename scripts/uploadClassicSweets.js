const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Classic Sweets products data
const classicSweetsProducts = [
  {
    name: "Besan Laddu",
    base_price: 636.00,
    description: "Besan Laddu (Gram Flour Sweet Balls) is a traditional Pakistani sweet that has an inspiring taste and texture.",
    image_url: "https://assets.indolj.io/upload/1682677275-beson-ladduuu.jpeg",
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
    name: "Moti Choor Laddu",
    base_price: 636.00,
    description: "Laddu Moti Choor entices both the eyes and the taste buds. Each bite reveals a symphony of flavors, as the grainy texture dissolves effortlessly, leaving behind a blissful sweetness that lingers on the palate.",
    image_url: "https://assets.indolj.io/upload/1738239532-Moti-Choor-Laddu-.jpg",
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
    name: "Lacha Pateesa",
    base_price: 636.00,
    description: "One of its kind desserts is a Pateesa, needless to tell you that the sweet is prepared with the best ingredients. It has an amazingly sweet, crispy, and flaky texture with a dash of that same desi flavor.",
    image_url: "https://assets.indolj.io/upload/1738225376-Laccha-Pateesa-.jpg",
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
    name: "Fancy Pateesa",
    base_price: 636.00,
    description: "One of its kind desserts is a Fancy Pateesa, needless to tell you that the sweet is prepared with best ingredients. It has an amazing sweet, crispy and flaky texture with a dash of that same milky desi flavor.",
    image_url: "https://assets.indolj.io/upload/1738225321-Milky-Pateesa-.jpg",
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
    name: "Pateesa Besan",
    base_price: 636.00,
    description: "Let Pateesa Besan take you on a culinary journey to the heart of Punjab. These golden-hued sweets, made from besan and infused with the goodness of desi ghee, offer a delightful combination of sweetness and nuttiness.",
    image_url: "https://assets.indolj.io/upload/1684998574-3A1A2784.JPG",
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
    name: "Matki Pairay",
    base_price: 924.00,
    description: "Rich, creamy traditional pairay crafted with pure khoya, elegantly garnished with silver leaf and an almond topping. A timeless mithai that blends heritage, flavor, and festive indulgence in every bite.",
    image_url: "https://assets.indolj.io/upload/1738225220-124A0808-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 923.72, available: true },
      { size: "1 Kg", price: 1847.45, available: false },
      { size: "2 Kg", price: 3694.9, available: false }
    ]
  },
  {
    name: "Special Pairay",
    base_price: 636.00,
    description: "Indulge in the allure of Special Pede, a true delicacy that captivates the senses. Immerse yourself in the velvety smoothness of these delectable treats, lovingly handcrafted to perfection.",
    image_url: "https://assets.indolj.io/upload/1738224600-Special-Peray-.jpg",
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
    name: "Pine Apple Pairay",
    base_price: 823.00,
    description: "Pineapple Pairay, is a delicious variant of Pairay, with added flavor and bits of Pineapple. It is made during different festivals and celebrations such as Holi, Diwali, Navratri and Eid.",
    image_url: "https://assets.indolj.io/upload/1738224568-Pineapple-Peray-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 822.5, available: true },
      { size: "1 Kg", price: 1644.1, available: true },
      { size: "2 Kg", price: 3288.2, available: false }
    ]
  },
  {
    name: "Pan Pairay Barfi",
    base_price: 636.00,
    description: "Pan Pairay are a special dessert in Pakistan, also known as Barfi. The main ingredients include condensed milk and sugar and they are shaped like hearts or paan shaped.",
    image_url: "https://assets.indolj.io/upload/1738224546-Pan-Peray-.jpg",
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
    name: "Plain Kalakand",
    base_price: 636.00,
    description: "Qalakand is a classic South Asian sweet prepared with solidified whole milk, flavoring and sugar. Kalakand has a flavorful lightness to it with numerous health benefits. The light sweet flavor softens up the mood.",
    image_url: "https://assets.indolj.io/upload/1741595843-Plain-Qalaqand-.jpg",
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
    name: "Man Pasand",
    base_price: 636.00,
    description: "A variant of Qalakand, Sohny Qalaqand is a popular South Asian sweet made out of solidified, sweetened milk and cottage cheese.",
    image_url: "https://assets.indolj.io/upload/1738223978-Sohny-Qalaqand-.jpg",
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
    name: "Special Chum Chum",
    base_price: 636.00,
    description: "These sweets are just like Cham Cham but with a twist! Topped with pineapple and cherry with coconut shavings, this sweet is kept for special occasions.",
    image_url: "https://assets.indolj.io/upload/1738223954-Special-Cham-Cham-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 635.59, available: true },
      { size: "1 Kg", price: 1271.18, available: true },
      { size: "2 Kg", price: 2542.36, available: true }
    ]
  },
  {
    name: "Balushahi",
    base_price: 636.00,
    description: "Balushahi are made from stiff dough, all-purpose flour and our Pure Ghee. They are very sweet and tasty with a slightly flaky texture. They are said to exhibit the traits of Mughal cuisine.",
    image_url: "https://assets.indolj.io/upload/1738223917-Balushahi-.jpg",
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
    name: "Barfi",
    base_price: 636.00,
    description: "The name Barfi is a derivative of the Urdu word for snow and ice and its a special dessert in Pakistan. The main ingredients of Barfis include condensed milk and sugar.",
    image_url: "https://assets.indolj.io/upload/1739608756-Barfi-.jpg",
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
    name: "Khajoor Delight",
    base_price: 2458.00,
    description: "Khajoor Delight is a delightful treat that combines the natural sweetness of dates with the richness of dry fruits. Each date is carefully filled with a flavorful blend of finely chopped nuts and complemented by a drizzle of pure honey.",
    image_url: "https://assets.indolj.io/upload/1738223812-Khajoor-Delight-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "1 Kg", price: 2457.62, available: true },
      { size: "2 Kg", price: 4915.24, available: false }
    ]
  },
  {
    name: "White Chum Chum",
    base_price: 636.00,
    description: "Indulge in the pure bliss of White Chum Chum, a divine confectionery that will transport your taste buds to a realm of sweetness. Crafted with love and expertise, these soft and succulent treats are made from fresh cottage cheese, lovingly soaked in a delicate sugar syrup.",
    image_url: "https://assets.indolj.io/upload/1738223587-Chum-Chum-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 635.59, available: true },
      { size: "1 Kg", price: 1271.18, available: true },
      { size: "2 Kg", price: 2542.36, available: true }
    ]
  },
  {
    name: "Special Qalaqand",
    base_price: 653.00,
    description: "Indulge in the opulence of Special Qalaqand, a truly decadent and luxurious sweet treat.",
    image_url: "https://assets.indolj.io/upload/1738320147-124A1143-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 652.54, available: true },
      { size: "1 Kg", price: 1305.09, available: true },
      { size: "2 Kg", price: 2610.18, available: true }
    ]
  },
  {
    name: "Dhaka Chum Chum",
    base_price: 636.00,
    description: "Dhaka Chamcham is a variant of the plain cham cham, with a bit similar taste but a different texture and colour.",
    image_url: "https://assets.indolj.io/upload/1738223190-Dacca-Chum-Chum-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 635.59, available: true },
      { size: "1 Kg", price: 1271.18, available: true },
      { size: "2 Kg", price: 2542.36, available: true }
    ]
  },
  {
    name: "Malai Chum Chum",
    base_price: 636.00,
    description: "The divine delight of Malai Chum Chum. With its soft, spongy texture and luscious malai filling, this sweet treat is a heavenly indulgence.",
    image_url: "https://assets.indolj.io/upload/1738223162-Malai-Cham-Cham2-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 635.59, available: true },
      { size: "1 Kg", price: 1271.18, available: true },
      { size: "2 Kg", price: 2542.36, available: true }
    ]
  }
];

async function uploadProducts() {
  console.log('Starting Classic Sweets upload to Supabase...');
  console.log(`Total products to upload: ${classicSweetsProducts.length}`);

  try {
    const { data, error } = await supabase
      .from('products')
      .insert(classicSweetsProducts)
      .select();

    if (error) {
      console.error('Error uploading products:', error);
      throw error;
    }

    console.log('✅ Successfully uploaded all Classic Sweets!');
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

uploadProducts()
  .then(() => {
    console.log('\n✨ Upload complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
