const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Pre-Order products data
const preOrderProducts = [
  {
    name: "Chocolate Burfi",
    base_price: 3814.00,
    description: "Layers of creamy burfee infused with rich chocolate, creating a perfect balance of tradition and indulgence in every bite.",
    image_url: "https://assets.indolj.io/upload/1755341767-Chocolate-Burfee.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3813.57, available: true },
      { size: "4Kg", price: 5084.76, available: true },
      { size: "5Kg", price: 6355.95, available: true }
    ]
  },
  {
    name: "Chum Chum Small",
    base_price: 3814.00,
    description: "Experience the joy of our mini Chum Chum, a delightful blend of soft textures and lively colors. Let these small sweets brighten up your day with their sweet charm. (Make to order)",
    image_url: "https://assets.indolj.io/upload/1758610869-124A0961-800x800.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3814, available: true },
      { size: "4Kg", price: 5085, available: true },
      { size: "5Kg", price: 6356, available: true }
    ]
  },
  {
    name: "Pinni Laddu",
    base_price: 6331.00,
    description: "A wholesome and traditional sweet made with desi ghee, wheat flour, and a rich blend of dry fruits. Perfect for a nutritious treat with authentic homemade flavors.",
    image_url: "https://assets.indolj.io/upload/1758545837-124A0854_800x800.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 6331, available: true },
      { size: "4Kg", price: 8441, available: true },
      { size: "5Kg", price: 10551, available: true }
    ]
  },
  {
    name: "Panjeeri Sugar Free",
    base_price: 7881.00,
    description: "A wholesome and healthy traditional delight made with whole wheat flour, desi ghee, and a rich blend of dry fruits — all without added sugar. Perfect for those seeking a nutritious yet guilt-free treat.",
    image_url: "https://assets.indolj.io/upload/1758607992-124A1154_800x800.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 7881.36, available: true },
      { size: "4Kg", price: 10508.48, available: true },
      { size: "5Kg", price: 13135.6, available: true }
    ]
  },
  {
    name: "Lauki Halwa",
    base_price: 3814.00,
    description: "A rich and creamy traditional dessert made from bottle gourd (lauki), slow-cooked in milk and ghee, sweetened to perfection, and garnished with crunchy nuts. A wholesome treat with a unique flavor and a melt-in-the-mouth texture.",
    image_url: "https://assets.indolj.io/upload/1758616572-124A3930_resized.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3814, available: true },
      { size: "4Kg", price: 5085, available: true },
      { size: "5Kg", price: 6356, available: true }
    ]
  },
  {
    name: "Suji Halwa",
    base_price: 3432.00,
    description: "A classic semolina dessert cooked to perfection in ghee, enriched with nuts and raisins — warm, rich, and utterly comforting.",
    image_url: "https://assets.indolj.io/upload/1755323213-Suja-Halwa.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3432.21, available: true },
      { size: "4Kg", price: 4576.28, available: true },
      { size: "5Kg", price: 5720.35, available: true }
    ]
  },
  {
    name: "Coconut Qalaqand",
    base_price: 3814.00,
    description: "Immerse yourself in the creamy paradise of Coconut Qalaqand. Crafted with love and expertise, this sweet delicacy offers a harmonious blend of coconut and condensed milk, creating a heavenly dessert that will enchant your palate.",
    image_url: "https://assets.indolj.io/upload/1738225877-Coconut-Qalaqand-.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3814, available: true },
      { size: "4Kg", price: 5085, available: true },
      { size: "5Kg", price: 6356, available: true }
    ]
  },
  {
    name: "Cherry Qalaqand",
    base_price: 5186.00,
    description: "Cherry Halwa is a perfect blend of ghee, flour, sugar and khoya to make irresistible dessert mixed with cherries. Share it with your friends or family on any special day and let their taste buds experience a buttery sensation.",
    image_url: "https://assets.indolj.io/upload/1684996388-3A1A3193.JPG",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 5186, available: true },
      { size: "4Kg", price: 6915, available: true },
      { size: "5Kg", price: 8644, available: true }
    ]
  },
  {
    name: "Chocolate Qalaqand",
    base_price: 3814.00,
    description: "This exquisite sweet delicacy combines the rich flavors of creamy qalaqand with the heavenly taste of premium chocolate.",
    image_url: "https://assets.indolj.io/upload/1684996553-3A1A3141.JPG",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3814, available: true },
      { size: "4Kg", price: 5085, available: true },
      { size: "5Kg", price: 6356, available: true }
    ]
  },
  {
    name: "Urdia Laddu",
    base_price: 5415.00,
    description: "Let the enchanting taste of Urdu Laddu whisk you away to a land of authentic Pakistani flavors. Enjoy the sweetness and embrace the cultural heritage with each bite of Urdu Laddu.",
    image_url: "https://assets.indolj.io/upload/1738225758-Urdia-Laddu-.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 5415, available: true },
      { size: "4Kg", price: 7220, available: true },
      { size: "5Kg", price: 9025, available: true }
    ]
  },
  {
    name: "Khoya Laddu",
    base_price: 4703.00,
    description: "Made from the finest khoya, each laddo is meticulously shaped and adorned with a sprinkle of love. With their velvety texture and rich, aromatic flavors, Khoya Laddo offers a moment of pure bliss with every bite (Make to order)",
    image_url: "https://assets.indolj.io/upload/1738225600-Khoya-Laddu-.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 4703, available: true },
      { size: "4Kg", price: 6271, available: true },
      { size: "5Kg", price: 7839, available: true }
    ]
  },
  {
    name: "Milky Pateesa",
    base_price: 3814.00,
    description: "One of its kind desserts is a Milky Pateesa, needless to tell you that the sweet is prepared with the best ingredients. It has an amazingly sweet, crispy, and flaky texture with a dash of that same milky desi flavor. Make to order",
    image_url: "https://assets.indolj.io/upload/1680767516-milky%20pateesa.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3814, available: true },
      { size: "4Kg", price: 5085, available: true },
      { size: "5Kg", price: 6356, available: true }
    ]
  },
  {
    name: "Alsee Pateesa",
    base_price: 3814.00,
    description: "Alsee Pateesa is usually cube-shaped or served as flakes, Full of nutritions, and has a crisp and flaky texture.",
    image_url: "https://assets.indolj.io/upload/1738569747-124A4077-.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3814, available: true },
      { size: "4Kg", price: 5085, available: true },
      { size: "5Kg", price: 6356, available: true }
    ]
  },
  {
    name: "Makhan Baray",
    base_price: 3814.00,
    description: "Savor the traditional charm and exquisite taste of Makhan Baray, These exquisite sweets are crafted with utmost care and precision, ensuring a melt-in-your-mouth experience that will leave you craving for more.",
    image_url: "https://assets.indolj.io/upload/1738566586-124A3887-.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3814, available: true },
      { size: "4Kg", price: 5085, available: true },
      { size: "5Kg", price: 6356, available: true }
    ]
  },
  {
    name: "Zafrani Payray",
    base_price: 3864.00,
    description: "Zafrani Paiday are a special and regal delight for every occasion. They are made with pure khoya (condensed milk) and then Zafran(Saffron) is added for an extra flavor. (This item is make to order)*",
    image_url: "https://assets.indolj.io/upload/1741596086-Zafrani-Peray-.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3864, available: true },
      { size: "4Kg", price: 5153, available: true },
      { size: "5Kg", price: 6441, available: true }
    ]
  },
  {
    name: "Strawberry Qalaqand",
    base_price: 4881.00,
    description: "Our Strawberry Qalaqand is a perfect balance of fruity freshness and indulgent chocolatey goodness. Each bite is a burst of vibrant strawberry flavor complemented by the smooth, luxurious notes of chocolate.",
    image_url: "https://assets.indolj.io/upload/1738566610-124A3856-.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 4881, available: true },
      { size: "4Kg", price: 6508, available: true },
      { size: "5Kg", price: 8136, available: true }
    ]
  },
  {
    name: "Dry Fruit Qalaqand",
    base_price: 5085.00,
    description: "Dry Fruit Qalaqand is a classic South Asian sweet prepared with solidified whole milk, flavoring and sugar with a mix of dry fruits. (Make to order)",
    image_url: "https://assets.indolj.io/upload/1738569549-124A3834-.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 5085, available: true },
      { size: "4Kg", price: 6780, available: true },
      { size: "5Kg", price: 8475, available: true }
    ]
  },
  {
    name: "Sandesh Qalaqand",
    base_price: 3814.00,
    description: "Discover the allure of Sandes Qalaqand and experience the essence of traditional sweetness. With its irresistible taste and captivating aroma, it is sure to become a cherished part of your sweet memories. (Make to order)",
    image_url: "https://assets.indolj.io/upload/1738224013-124A1038-.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3814, available: true },
      { size: "4Kg", price: 5085, available: true },
      { size: "5Kg", price: 6356, available: true }
    ]
  },
  {
    name: "Cream Pateesa Pink",
    base_price: 3814.00,
    description: "A rich, layered sweet delicacy made with premium milk solids and a touch of strawberry essence, finished with a creamy top layer and garnished with almond slivers for the perfect festive indulgence.",
    image_url: "https://assets.indolj.io/upload/1758621936-124A0874_resized.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3813.57, available: true },
      { size: "4Kg", price: 5084.76, available: true },
      { size: "5Kg", price: 6355.95, available: true }
    ]
  },
  {
    name: "Chocolate Roll",
    base_price: 4653.00,
    description: "Soft and rich rolls of burfee filled with chocolatey goodness — a perfect fusion of traditional mithai and indulgent cocoa flavor.",
    image_url: "https://assets.indolj.io/upload/1755338850-Almond-Roll-Burfee.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 4652.54, available: true },
      { size: "4Kg", price: 6203.39, available: true },
      { size: "5Kg", price: 7754.24, available: true }
    ]
  },
  {
    name: "Malai Khaja",
    base_price: 3915.00,
    description: "Malai Khaja, a heavenly delight crafted to perfection. These delicate and crispy pastries are filled with rich, creamy malai (cream), offering a luxurious indulgence that simply melts in your mouth. (Make to order)",
    image_url: "https://assets.indolj.io/upload/1738223890-Malai-Khaja-.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 3915, available: true },
      { size: "4Kg", price: 5220, available: true },
      { size: "5Kg", price: 6525, available: true }
    ]
  },
  {
    name: "Badam Crunch",
    base_price: 5492.00,
    description: "Badam Crunch, a nutty sensation that will leave you craving for more. These delectable treats are crafted with utmost care, combining the rich flavors of almonds with a delightful crunch. (Make to order)",
    image_url: "https://assets.indolj.io/upload/1680770259-badam%20crunch.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 5492, available: true },
      { size: "4Kg", price: 7322, available: true },
      { size: "5Kg", price: 9153, available: true }
    ]
  },
  {
    name: "Malai Pairay",
    base_price: 5924.00,
    description: "Malai pera is a creamy and melt-in-your-mouth confection that combines the richness of milk solids with the subtle sweetness of sugar.",
    image_url: "https://assets.indolj.io/upload/1680770349-malai%20pera.jpg",
    category: "SWEETS",
    subcategory: "PRE-ORDER",
    tag: null,
    variants: [
      { size: "3Kg", price: 5924, available: true },
      { size: "4Kg", price: 7898, available: true },
      { size: "5Kg", price: 9873, available: true }
    ]
  }
];

async function uploadProducts() {
  console.log('Starting PRE-ORDER products upload to Supabase...');
  console.log(`Total products to upload: ${preOrderProducts.length}`);

  try {
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('name, image_url')
      .eq('subcategory', 'PRE-ORDER');

    if (fetchError) {
      console.error('Error fetching existing products:', fetchError);
      throw fetchError;
    }

    console.log(`\nFound ${existingProducts.length} existing PRE-ORDER products in database`);

    const existingNames = new Set(existingProducts.map(p => p.name.toLowerCase()));
    const existingImages = new Set(existingProducts.map(p => p.image_url));

    const productsToUpload = preOrderProducts.filter(product => {
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

    console.log('✅ Successfully uploaded PRE-ORDER products!');
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
