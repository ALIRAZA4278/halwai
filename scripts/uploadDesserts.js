const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const dessertsProducts = [
  {
    name: "Ras malai Cup 2 Pcs",
    description: "Includes 2 pcs of Ras malai",
    category: "DESSERTS",
    subcategory: "DESSERTS",
    base_price: 237,
    image_url: "https://assets.indolj.io/upload/1738393024-124A1348-.jpg",
    variants: []
  },
  {
    name: "Doodh Dulari",
    description: "A delightful combination of creamy milk, jelly, cham cham, and colorful noodles, creating a playful and indulgent dessert experience.",
    category: "DESSERTS",
    subcategory: "DESSERTS",
    base_price: 568,
    image_url: "https://assets.indolj.io/upload/1738392927-124A1340-.jpg",
    variants: [
      { size: "Half Kg", price: 567.79, available: true },
      { size: "1 Kg", price: 1135.59, available: false }
    ]
  },
  {
    name: "Kheer",
    description: "Each spoonful of Kheer is a heavenly combination of smooth texture and delectable flavors, making it the perfect dessert to satisfy your sweet cravings.",
    category: "DESSERTS",
    subcategory: "DESSERTS",
    base_price: 241,
    image_url: "https://assets.indolj.io/upload/1738566540-124A3938-.jpg",
    variants: [
      { size: "250GM", price: 241.25, available: true },
      { size: "500gm", price: 474.57, available: true }
    ]
  },
  {
    name: "Kulfi Falooda",
    description: "Kulfi is best described as traditional Pakistani-style ice cream. However, unlike ice cream, kulfi is not churned. This is a fantastic summer dessert. (Minimum 10 Kulfi to be ordered).",
    category: "DESSERTS",
    subcategory: "DESSERTS",
    base_price: 1831,
    image_url: "https://assets.indolj.io/upload/1738392901-124A1292-.jpg",
    variants: [
      { size: "12 Pcs", price: 1830.5, available: true },
      { size: "18 Pcs", price: 2745.76, available: true },
      { size: "24 Pcs", price: 3661.02, available: false }
    ]
  },
  {
    name: "Rabri",
    description: "Made from milk, Rabri is thickened, sweetened milk having layers of malai or cream in it and flavored with cardamoms and saffron with the addition of dry fruits like almonds and pistachios.",
    category: "DESSERTS",
    subcategory: "DESSERTS",
    base_price: 610,
    image_url: "https://assets.indolj.io/upload/1738392878-124A1351-.jpg",
    variants: [
      { size: "Half Kg", price: 610.195, available: true },
      { size: "1 Kg", price: 1220.34, available: true }
    ]
  },
  {
    name: "Ras Malai",
    description: "Ras malai is a dessert made from cottage or ricotta cheese soaked in sweetened, thickened milk delicately flavored with cardamom. It is best described as a rich cheesecake without a crust.",
    category: "DESSERTS",
    subcategory: "DESSERTS",
    base_price: 661,
    image_url: "https://assets.indolj.io/upload/1738392853-124A1348-.jpg",
    variants: [
      { size: "6 Pcs", price: 661.01, available: true },
      { size: "12 Pcs", price: 1322.03, available: true }
    ]
  },
  {
    name: "Chocolate Kulfi Falooda",
    description: "A rich twist on tradition — creamy chocolate kulfi served over chilled, milky falooda. Silky, indulgent, and irresistibly smooth.",
    category: "DESSERTS",
    subcategory: "DESSERTS",
    base_price: 1831,
    image_url: "https://assets.indolj.io/upload/1755321864-Chocolate-Kulfi-Faluda.jpg",
    variants: [
      { size: "12 Pcs", price: 1831, available: true },
      { size: "18 Pcs", price: 2746, available: true },
      { size: "24 Pcs", price: 3661, available: false }
    ]
  },
  {
    name: "Sugar Free Rabri",
    description: "A rich and creamy traditional rabri, made without added sugar and topped with pistachios — a guilt-free indulgence full of flavor.",
    category: "DESSERTS",
    subcategory: "DESSERTS",
    base_price: 610,
    image_url: "https://assets.indolj.io/upload/1755323763-Suger-free-Rabri.jpg",
    variants: [
      { size: "Half Kg", price: 610, available: true },
      { size: "1 Kg", price: 1220, available: false }
    ]
  },
  {
    name: "Diet Kulfi Falooda",
    description: "A lighter twist on a traditional favorite, our Diet Kulfi Falooda combines creamy, refreshing kulfi with silky falooda vermicelli, served in a pool of chilled, sweetened milk. Crafted with reduced sugar for a guilt-free indulgence, it's the perfect dessert to satisfy your cravings while keeping it light and wholesome.",
    category: "DESSERTS",
    subcategory: "DESSERTS",
    base_price: 1831,
    image_url: "https://assets.indolj.io/upload/1756794180-Diet-Kulfi.jpg",
    variants: [
      { size: "12 Pcs", price: 1831, available: true },
      { size: "18 Pcs", price: 2746, available: false },
      { size: "24 Pcs", price: 3661, available: false }
    ]
  },
  {
    name: "Plain Kulfi",
    description: "A creamy, traditional frozen dessert made with slow-cooked milk, delicately sweetened and infused with subtle hints of cardamom for a rich, authentic taste of classic kulfi delight.",
    category: "DESSERTS",
    subcategory: "DESSERTS",
    base_price: 1424,
    image_url: "https://assets.indolj.io/upload/1758780830-124A1327_resized.jpg",
    variants: [
      { size: "12 Pcs", price: 1423.68, available: true },
      { size: "18 Pcs", price: 2135.52, available: true },
      { size: "24 Pcs", price: 2847.36, available: true }
    ]
  }
];

async function uploadDessertsProducts() {
  console.log('Starting to upload Desserts products...');

  for (const product of dessertsProducts) {
    try {
      // Check if product already exists
      const { data: existingProduct, error: checkError } = await supabase
        .from('products')
        .select('id')
        .eq('name', product.name)
        .eq('subcategory', 'DESSERTS')
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

  console.log('\nDesserts products upload complete!');
}

uploadDessertsProducts();
