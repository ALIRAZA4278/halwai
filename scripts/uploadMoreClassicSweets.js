const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// New Classic Sweets products - checking for duplicates
const newClassicSweetsProducts = [
  {
    name: "Arabic Basbousa",
    base_price: 644.00,
    description: "A Middle Eastern classic, our Arabic Basbousa is a soft, moist semolina cake soaked in fragrant sugar syrup and topped with crunchy almond slices. Lightly sweet, delicately textured, and irresistibly flavorful, it's the perfect dessert to savor with tea or serve on festive occasions.",
    image_url: "https://assets.indolj.io/upload/1680770356-basbousa.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 644, available: true },
      { size: "1 Kg", price: 1288, available: true },
      { size: "2 Kg", price: 2576, available: true }
    ]
  },
  {
    name: "Black Jaman",
    base_price: 636.00,
    description: "Dark in colour and rich in aroma, being popular for its signature taste and texture, Gulab Jamun is served mildly hot. It is milk-solids-based dessert, popular in countries of South Asia such as Pakistan, India, Sri Lanka, Nepal and Bangladesh.",
    image_url: "https://assets.indolj.io/upload/1738223142-Kala-Jamun-.jpg",
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
    name: "Qaiser Pak",
    base_price: 636.00,
    description: "Prepared using pure and hygienically processed ingredients, such as dry fruits, milk and other dairy products, qaisar pak is one of the most popular mithais of the subcontinent.",
    image_url: "https://assets.indolj.io/upload/1738223667-Kesar-Pak-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 635.59, available: true },
      { size: "1 Kg", price: 1271.18, available: true }
    ]
  },
  {
    name: "Gulab Jaman Small",
    base_price: 636.00,
    description: "Small Jamuns are a variant of the famous Gulab Jamans, somewhat similar in taste, this sweet makes every party, occasion, and gathering much more special.",
    image_url: "https://assets.indolj.io/upload/1684997877-3A1A3024.JPG",
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
    name: "Panjeeri",
    base_price: 1055.00,
    description: "As the name suggests, Panjiri is a concoction of 5 main ingredients and usually eaten in the winters to ward off cold.",
    image_url: "https://assets.indolj.io/upload/1738223645-Panjeeri-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 1055.1, available: true },
      { size: "1 Kg", price: 2110.2, available: true },
      { size: "2 Kg", price: 4220.4, available: true }
    ]
  },
  {
    name: "Gulab Jaman",
    base_price: 636.00,
    description: "Rich in aroma, being popular for its signature taste and texture, Gulab Jamun is served mildly hot. It is milk-solids-based dessert, popular in countries of South Asia such as Pakistan, India, Sri Lanka, Nepal and Bangladesh.",
    image_url: "https://assets.indolj.io/upload/1738223067-Gulab-Jamun-(2)-.jpg",
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
    name: "Kheer Mohan Yellow",
    base_price: 636.00,
    description: "Kheer Mohan is a distinctive Yellow sponge of Milk curd that will truly have your taste buds tingling. Topped with a traditional khoya (thickened milk) topping and chopped pistachio nuts, the smooth outer coating gives way to a wonderfully sweet and spongy filling.",
    image_url: "https://assets.indolj.io/upload/1738223051-Kheer-Mohan-Yellow-.jpg",
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
    name: "Mix Sweets",
    base_price: 636.00,
    description: "Experience a medley of flavors with our exquisite assortment of mix sweets. Perfect for those who appreciate variety, our mix sweets collection brings together an array of mouthwatering delights in one irresistible package.",
    image_url: "https://assets.indolj.io/upload/1738566433-124A4055-.jpg",
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
    name: "Anghotay Pairay",
    base_price: 636.00,
    description: "Anghote Pairay is a true indulgence that will leave you craving for more. Experience the harmony of traditional sweet and treat yourself to the irresistible taste of Anghote Pairay today.",
    image_url: "https://assets.indolj.io/upload/1756718858-Angutha-Paira.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 635.59, available: true },
      { size: "1 Kg", price: 1271.19, available: true },
      { size: "2 Kg", price: 2542.38, available: true }
    ]
  },
  {
    name: "Pheeka Khoya",
    base_price: 680.00,
    description: "Indulge in the culinary bliss of Pheeka Khoya. Its mild and creamy flavor melts in your mouth, making it perfect on its own or as an ingredient in traditional sweets and desserts.",
    image_url: "https://assets.indolj.io/upload/1738567984-124A4087-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 680, available: true },
      { size: "1 Kg", price: 1360, available: true },
      { size: "2 Kg", price: 2720, available: true }
    ]
  },
  {
    name: "Pineapple Coconut Barfi",
    base_price: 686.00,
    description: "Treat your palate to the delightful fusion of pineapple and coconut in our Pineapple Coconut Barfi. Let the tropical flavors dance on your tongue as you enjoy the soft, melt-in-your-mouth texture of this irresistible sweet delicacy.",
    image_url: "https://assets.indolj.io/upload/1738223019-Pineapple-Coconut-Barfi-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 686.45, available: true },
      { size: "1 Kg", price: 1372.9, available: true },
      { size: "2 Kg", price: 2745.8, available: true }
    ]
  },
  {
    name: "Khajoor Pateesa",
    base_price: 318.00,
    description: "A decadent layered sweet made with premium khajoor (dates) blended into rich, flaky pateesa, topped with almond slivers for a wholesome, melt-in-your-mouth treat full of natural sweetness and flavor.",
    image_url: "https://assets.indolj.io/upload/1758624760-124A0832_resized.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "250GM", price: 317.80, available: true },
      { size: "500gm", price: 635.60, available: true },
      { size: "1000GM", price: 1271.19, available: true }
    ]
  },
  {
    name: "Caramel Burfi",
    base_price: 686.00,
    description: "A rich, creamy twist on a traditional favorite — our Caramel Burfi blends the classic melt-in-your-mouth texture of burfi with the indulgent sweetness of caramel. Smooth, fudgy, and perfectly balanced, this mithai brings a modern flavor to a timeless treat, making it an irresistible delight for every occasion.",
    image_url: "https://assets.indolj.io/upload/1760431077-DSC09116-compressed.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 686, available: true },
      { size: "1 Kg", price: 1373, available: true },
      { size: "2 Kg", price: 2746, available: true }
    ]
  },
  {
    name: "Badam Pateesa",
    base_price: 784.00,
    description: "Light, flaky, and irresistibly nutty — our Badam Pateesa is crafted with layers of delicate, melt-in-your-mouth sweetness enriched with the crunch of premium almonds. A traditional mithai that perfectly balances crisp texture with rich flavor, making it a festive favorite for gifting or enjoying with family.",
    image_url: "https://assets.indolj.io/upload/1756891718-1.1.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 783, available: true },
      { size: "1 Kg", price: 1567, available: true },
      { size: "2 Kg", price: 3135, available: true }
    ]
  },
  {
    name: "Sohny Qalaqand",
    base_price: 655.00,
    description: "Sohny Qalaqand has a rich, creamy texture and a distinct sweetness. It is often served in small, square-shaped pieces and enjoyed as a dessert or sweet treat on special occasions such as weddings, festivals, or celebrations.",
    image_url: "https://assets.indolj.io/upload/1738225970-Manpasand-Qalaqand-.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 654.52, available: true },
      { size: "1 Kg", price: 1305.08, available: true },
      { size: "2 Kg", price: 2610, available: true }
    ]
  },
  {
    name: "Almond Roll",
    base_price: 644.00,
    description: "A rich and nutty delight, our Almond Roll is crafted with soft, melt-in-your-mouth khoya rolled around a luscious almond filling. Garnished with almond slices, this mithai is the perfect blend of creamy sweetness and crunchy nuttiness. A timeless indulgence for celebrations, gifting, or simply savoring with loved ones.",
    image_url: "https://assets.indolj.io/upload/1756718750-Almond-Roll.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 644, available: true },
      { size: "1 Kg", price: 1288, available: true },
      { size: "2 Kg", price: 2576, available: true }
    ]
  },
  {
    name: "Almond Burfi",
    base_price: 653.00,
    description: "Rich and creamy burfee infused with almonds, cut into perfect squares and garnished with almond slices — a nutty, melt-in-your-mouth delight.",
    image_url: "https://assets.indolj.io/upload/1755338234-Almond-Burfee.jpg",
    category: "SWEETS",
    subcategory: "CLASSIC SWEETS",
    tag: null,
    variants: [
      { size: "Half Kg", price: 652.54, available: true },
      { size: "1 Kg", price: 1305.09, available: true },
      { size: "2 Kg", price: 2610.18, available: false }
    ]
  }
];

async function uploadProducts() {
  console.log('Starting new Classic Sweets upload to Supabase...');
  console.log(`Total products to upload: ${newClassicSweetsProducts.length}`);

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

    const productsToUpload = newClassicSweetsProducts.filter(product => {
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
