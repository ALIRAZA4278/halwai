const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDairy() {
  console.log('Checking DAIRY products in database...\n');

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('subcategory', 'DAIRY');

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    console.log(`Found ${data.length} DAIRY products:\n`);
    data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Subcategory: ${product.subcategory}`);
      console.log(`   Price: Rs. ${product.base_price}`);
      console.log(`   Variants:`, product.variants);
      console.log('');
    });
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

checkDairy();
