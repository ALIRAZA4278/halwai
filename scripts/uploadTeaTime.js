const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Tea Time products data
const teaTimeProducts = [
  {
    name: "Selection Assorted Cookies",
    base_price: 517.00,
    description: "Delight in the crisp, buttery Ringo Cookie, the chewy richness of Date Cookie, and the nutty perfection of Almond Cookie. Experience the tropical twist of Coconut Cookie, and savor the irresistible blend of chocolate and peanuts in our Chocolate Peanut Cookie.",
    image_url: "https://assets.indolj.io/upload/1739010754-124A0354-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "350g", price: 517.00, available: true }
    ]
  },
  {
    name: "Flaky Treat Gift Pack",
    base_price: 263.00,
    description: "Flaky Treat is a delightful pack of puff biscuits that will satisfy your cravings for a light and crispy snack. These flaky treats are made with layers of buttery pastry that melt in your mouth, creating a truly indulgent experience.",
    image_url: "https://assets.indolj.io/upload/1739010728-124A0390-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "175g", price: 263.00, available: true }
    ]
  },
  {
    name: "Almond Cookies Gift Pack",
    base_price: 305.00,
    description: "These cookies are the perfect balance of sweetness and nuttiness, making them a delightful treat for any occasion.",
    image_url: "https://assets.indolj.io/upload/1758016790-124A0324_1_800x800.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "200g", price: 305.00, available: true }
    ]
  },
  {
    name: "Almond Chocolate Chip Cookies",
    base_price: 305.00,
    description: "These delectable cookies are packed full of premium chocolate chips and adorned with a generous sprinkling of roasted almond pieces. Each bite is a delightful combination of smooth chocolate, nutty almonds, and a satisfying crunch.",
    image_url: "https://assets.indolj.io/upload/1739010640-124A0357-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "200g", price: 305.00, available: true }
    ]
  },
  {
    name: "Checker Cookies Gift Pack",
    base_price: 305.00,
    description: "This box is filled with a variety of mouthwatering checkerboard patterned cookies that are as visually appealing as they are delicious. Each cookie features a perfect balance of flavors.",
    image_url: "https://assets.indolj.io/upload/1739010624-124A0322-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "200g", price: 305.00, available: true }
    ]
  },
  {
    name: "Cumin Cookies Gift Pack",
    base_price: 305.00,
    description: "These savory treats are a delightful combination of buttery goodness and aromatic cumin. With every bite, you'll experience a burst of warm and earthy flavors that will tantalize your taste buds.",
    image_url: "https://assets.indolj.io/upload/1739010605-124A0325-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "200GM", price: 305.00, available: true }
    ]
  },
  {
    name: "Kalonji Cookies Gift Pack",
    base_price: 305.00,
    description: "These delicious treats are made with the finest ingredients, including nutrient-rich black seeds. Each bite offers a delightful combination of crunchy texture and subtly sweet flavor, complemented by the earthy notes of black seeds",
    image_url: "https://assets.indolj.io/upload/1739010585-124A0356-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "200g", price: 305.00, available: true }
    ]
  },
  {
    name: "Butter Croissant",
    base_price: 127.00,
    description: "Made with premium ingredients and a generous amount of butter, our croissant offers a rich and delicate flavor that pairs perfectly with your morning coffee or tea.",
    image_url: "https://assets.indolj.io/upload/1740654802-124A9873-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "1 Piece", price: 127.00, available: true }
    ]
  },
  {
    name: "Chocolate Croissant",
    base_price: 145.00,
    description: "Savor the irresistible combination of rich chocolate and flaky pastry with our delectable Chocolate Croissant.",
    image_url: "https://assets.indolj.io/upload/1740654793-124A9867-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "1 Piece", price: 145.00, available: true }
    ]
  },
  {
    name: "Fruit Cake",
    base_price: 271.00,
    description: "Fruit cake is a timeless classic that brings joy and satisfaction to all who taste it. Indulge in the lusciousness of our fruit cake.",
    image_url: "https://assets.indolj.io/upload/1758804294-124A3971-resized.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "200GM", price: 271.18, available: true },
      { size: "400GM", price: 500.00, available: true }
    ]
  },
  {
    name: "Plain Cake",
    base_price: 127.00,
    description: "Sponge cake is a true classic that embodies simplicity and lightness. Made with the finest ingredients and expertly baked to perfection, each bite of our sponge cake is a fluffy and tender delight",
    image_url: "https://assets.indolj.io/upload/1754742458-Plain-Cake-400g.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "100GM", price: 127.115, available: true },
      { size: "200GM", price: 237.29, available: true },
      { size: "400GM", price: 440.68, available: true }
    ]
  },
  {
    name: "Bakar Khani Plain",
    base_price: 263.00,
    description: "This delicate pastry is crafted with love and expertise, ensuring a heavenly experience with every bite. Whether enjoyed on its own, paired with tea or coffee, or used as a base for delectable desserts, Bakar Khani is a treat that will leave you craving for more.",
    image_url: "https://assets.indolj.io/upload/1739440920-124A3816-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 262.71, available: true },
      { size: "500gm", price: 525.42, available: true },
      { size: "1 Kg", price: 1050.84, available: false }
    ]
  },
  {
    name: "Bakar Khani Stick",
    base_price: 263.00,
    description: "This delicate pastry is crafted with love and expertise, ensuring a heavenly experience with every bite. Whether enjoyed on its own, paired with tea or coffee, or used as a base for delectable desserts, Bakar Khani is a treat that will leave you craving for more.",
    image_url: "https://assets.indolj.io/upload/1739440882-Stick-Bakarkhani-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 262.71, available: true },
      { size: "500gm", price: 525.42, available: true },
      { size: "1 Kg", price: 1050.84, available: true }
    ]
  },
  {
    name: "Bakar Khani Round",
    base_price: 263.00,
    description: "This delicate pastry is crafted with love and expertise, ensuring a heavenly experience with every bite. Whether enjoyed on its own, paired with tea or coffee, or used as a base for delectable desserts, Bakar Khani is a treat that will leave you craving for more.",
    image_url: "https://assets.indolj.io/upload/1739440872-Round-Bakarkhani-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 262.71, available: true },
      { size: "500gm", price: 525.42, available: true },
      { size: "1 Kg", price: 1050.84, available: true }
    ]
  },
  {
    name: "Chocolate Marble Biscuits",
    base_price: 288.00,
    description: "Marble Biscuits are sure to satisfy your sweet tooth. Indulge in the marbled goodness and savor the irresistible blend of flavors in every bite.",
    image_url: "https://assets.indolj.io/upload/1739440861-Marble-Biscuit-(2)-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "Chocolate Biscuits",
    base_price: 288.00,
    description: "Experience the delightful combination of chocolate and biscuits with our Chocolate Phool Biscuit. Taste the floral-inspired bliss of our Chocolate Phool Biscuit and let your taste buds blossom with every bite.",
    image_url: "https://assets.indolj.io/upload/1739440851-Chocolate-Dot-Biscuit-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "Chocolate Peanut Biscuits",
    base_price: 288.00,
    description: "These delectable bites feature a crunchy peanut center coated in a smooth and rich chocolate shell. With each bite, you'll experience the perfect balance of sweet and savory flavors.",
    image_url: "https://assets.indolj.io/upload/1739440844-Chocolate-Peanut-Cookies-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: false }
    ]
  },
  {
    name: "Nan Khatai",
    base_price: 331.00,
    description: "Each Nan Khatai is carefully crafted to perfection, boasting a golden-brown exterior and a soft, buttery interior.",
    image_url: "https://assets.indolj.io/upload/1739440836-Nan-Khatai-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 330.5, available: true },
      { size: "500gm", price: 661, available: true },
      { size: "1 Kg", price: 1322, available: true }
    ]
  },
  {
    name: "Chocolate Chip Biscuits",
    base_price: 288.00,
    description: "The combination of the buttery dough and the creamy, melted chocolate creates a flavor profile that is both comforting and indulgent.",
    image_url: "https://assets.indolj.io/upload/1739440828-Chocolate-Chip-Cookies-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: false }
    ]
  },
  {
    name: "Jam Biscuits",
    base_price: 288.00,
    description: "Made with love and care, this classic treat features a soft and buttery cookie base with a sweet and tangy jam center.",
    image_url: "https://assets.indolj.io/upload/1739440819-Jam-dot-Cookies-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "Coffee Walnut Cookies",
    base_price: 288.00,
    description: "These delectable treats are crafted with precision to deliver a delightful blend of flavors and textures. Each bite offers a heavenly combination of the bold aroma of coffee and the nutty goodness of walnuts.",
    image_url: "https://assets.indolj.io/upload/1739440797-Coffee-Walnut-Biscuit-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "Checker Biscuits",
    base_price: 288.00,
    description: "This box is filled with a variety of mouthwatering checkerboard patterned cookies that are as visually appealing as they are delicious. Each cookie features a perfect balance of flavors.",
    image_url: "https://assets.indolj.io/upload/1739440791-Marble-Biscuit-(3)-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "Kalonji Biscuit",
    base_price: 288.00,
    description: "These delicious treats are made with the finest ingredients, including nutrient-rich black seeds. Each bite offers a delightful combination of crunchy texture and subtly sweet flavor, complemented by the earthy notes of black seeds.",
    image_url: "https://assets.indolj.io/upload/1739440783-Kalonji-Biscuit-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "Zeera Biscuit",
    base_price: 288.00,
    description: "These bite-sized treats are baked to perfection, with a delicate buttery texture and a hint of the distinctive zeera.",
    image_url: "https://assets.indolj.io/upload/1739440777-Zeera-Biscuit-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "French Heart Biscuits",
    base_price: 263.00,
    description: "This exquisite treat is crafted with utmost care, ensuring a perfect balance of buttery goodness and delicate flakiness with its charming heart shape.",
    image_url: "https://assets.indolj.io/upload/1739440766-French-Heart-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 262.71, available: true },
      { size: "500gm", price: 525.42, available: true },
      { size: "1 Kg", price: 1050.84, available: true }
    ]
  },
  {
    name: "Almond Cookies",
    base_price: 288.00,
    description: "These cookies are the perfect balance of sweetness and nuttiness, making them a delightful treat for any occasion.",
    image_url: "https://assets.indolj.io/upload/1758018474-124A0533-800x800.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288, available: true },
      { size: "Half Kg", price: 576, available: true },
      { size: "1 Kg", price: 1153, available: true }
    ]
  },
  {
    name: "Round Khara Biscuits",
    base_price: 263.00,
    description: "This delicate pastry is crafted with love and expertise, ensuring a heavenly experience with every bite. Whether enjoyed on its own, paired with tea or coffee, or used as a base for delectable desserts, Gol Khara is a treat that will leave you craving for more.",
    image_url: "https://assets.indolj.io/upload/1739440687-124A3814-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 262.71, available: true },
      { size: "500gm", price: 525.42, available: true },
      { size: "1 Kg", price: 1050.84, available: false }
    ]
  },
  {
    name: "Tai Khara Biscuits",
    base_price: 263.00,
    description: "This delicate pastry is crafted with love and expertise, ensuring a heavenly experience with every bite. Whether enjoyed on its own, paired with tea or coffee, or used as a base for delectable desserts, Tai Khara is a treat that will leave you craving for more.",
    image_url: "https://assets.indolj.io/upload/1739440642-Tai-Khara-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 262.71, available: true },
      { size: "500gm", price: 525.42, available: true },
      { size: "1 Kg", price: 1050.84, available: true }
    ]
  },
  {
    name: "Almond Ringo Biscuits",
    base_price: 288.00,
    description: "Each biscuit is carefully crafted with a single almond placed in the center, adding a delightful crunch and nutty flavor to every bite.",
    image_url: "https://assets.indolj.io/upload/1680774152-almond%20ringo.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "Double Karela Biscuit",
    base_price: 288.00,
    description: "This unique and visually appealing treat pays homage to the distinct shape of karela, while offering a delicious twist",
    image_url: "https://assets.indolj.io/upload/1739440610-Double-Karela-Cookies--.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "Karela Biscuit",
    base_price: 288.00,
    description: "This unique and visually appealing treat pays homage to the distinct shape of karela, while offering a delicious twist.",
    image_url: "https://assets.indolj.io/upload/1739440602-Karela-Biscuit-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "500gm", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "Mix Biscuits",
    base_price: 288.00,
    description: "An assorted selection of our finest biscuits crispy, buttery, and full of flavor. Perfect for tea time or gifting!",
    image_url: "https://assets.indolj.io/upload/1738566414-124A3780-.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288.13, available: true },
      { size: "Half Kg", price: 576.26, available: true },
      { size: "1 Kg", price: 1152.53, available: true }
    ]
  },
  {
    name: "Almond Nan Khatai",
    base_price: 331.00,
    description: "A traditional delight with a nutty twist, our Almond Nan Khatai is a buttery, crumbly cookie infused with the rich flavor of almonds. Baked to golden perfection and topped with crunchy almond bits, it offers the perfect balance of melt-in-the-mouth texture and delicate sweetness.",
    image_url: "https://assets.indolj.io/upload/1757917927-Almond-Nankhatai.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 330.5, available: true },
      { size: "Half Kg", price: 661, available: true },
      { size: "1 Kg", price: 1322.034, available: true }
    ]
  },
  {
    name: "Special Sugar Free Biscuits",
    base_price: 314.00,
    description: "Light, crispy, and perfectly golden, our Special Sugar-Free Biscuits bring you the classic tea-time crunch without the sugar. A wholesome choice for guilt-free indulgence, they're baked to perfection for a healthier yet delicious snack.",
    image_url: "https://assets.indolj.io/upload/1758011346-124A3795_800x800.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 314, available: true },
      { size: "Half Kg", price: 627, available: true },
      { size: "1 Kg", price: 1254, available: true }
    ]
  },
  {
    name: "Peanut Ringo Biscuits",
    base_price: 288.00,
    description: "Crispy, buttery biscuits generously topped with crunchy cashew pieces a perfect blend of nutty flavor and melt-in-mouth goodness. Ideal for tea time or anytime indulgence.",
    image_url: "https://assets.indolj.io/upload/1758175051-124A0459_800x800%20(1).jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288, available: true },
      { size: "Half Kg", price: 576, available: true },
      { size: "1 Kg", price: 1153, available: true }
    ]
  },
  {
    name: "Date Cookies",
    base_price: 288.00,
    description: "Soft and chewy, our Date Cookies are made with rich, naturally sweet dates blended into a buttery dough. A healthy yet indulgent treat, perfect for tea-time or a guilt-free snack.",
    image_url: "https://assets.indolj.io/upload/1758177168-124A3812_800x800.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288, available: true },
      { size: "Half Kg", price: 576, available: true },
      { size: "1 Kg", price: 1153, available: true }
    ]
  },
  {
    name: "Cashew Nan Khatai",
    base_price: 331.00,
    description: "Each Nan Khatai is carefully crafted to perfection, boasting a golden-brown exterior and a soft, buttery interior.",
    image_url: "https://assets.indolj.io/upload/1758179657-124A3785_800x800%20(1).jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 330.5, available: true },
      { size: "Half Kg", price: 661, available: true },
      { size: "1 Kg", price: 1322.034, available: false }
    ]
  },
  {
    name: "Pista Biscuits",
    base_price: 288.00,
    description: "Delightfully crisp and buttery, our Pista Biscuits are packed with the rich flavor of pistachios, making them the perfect tea-time companion or snack for nut lovers.",
    image_url: "https://assets.indolj.io/upload/1758180985-124A0484_800x800.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288, available: true },
      { size: "Half Kg", price: 576, available: true },
      { size: "1 Kg", price: 1153, available: true }
    ]
  },
  {
    name: "White Coconut Biscuits",
    base_price: 288.00,
    description: "Crispy and buttery coconut biscuits with a light sweetness and a delicate coconut flavor, perfect for tea-time or snacking.",
    image_url: "https://assets.indolj.io/upload/1758191393-124A0517_800x800.jpg",
    category: "BAKERY",
    subcategory: "TEA TIME",
    tag: null,
    variants: [
      { size: "250GM", price: 288, available: true },
      { size: "Half Kg", price: 576, available: true },
      { size: "1 Kg", price: 1153, available: true }
    ]
  }
];

async function uploadProducts() {
  console.log('Starting TEA TIME products upload to Supabase...');
  console.log(`Total products to upload: ${teaTimeProducts.length}`);

  try {
    // Check for existing products
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('name, image_url')
      .eq('subcategory', 'TEA TIME');

    if (fetchError) {
      console.error('Error fetching existing products:', fetchError);
      throw fetchError;
    }

    console.log(`\nFound ${existingProducts.length} existing TEA TIME products in database`);

    // Filter out duplicates
    const existingNames = new Set(existingProducts.map(p => p.name.toLowerCase()));
    const existingImages = new Set(existingProducts.map(p => p.image_url));

    const productsToUpload = teaTimeProducts.filter(product => {
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

    console.log('✅ Successfully uploaded TEA TIME products!');
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
