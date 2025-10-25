const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDuplicates() {
  console.log('Checking for duplicate dairy products...\n');

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or('name.eq.Makhan Mania,name.eq.Pure Ghee');

    if (error) {
      console.error('Error:', error);
      throw error;
    }

    console.log(`Found ${data.length} products:\n`);
    data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Subcategory: ${product.subcategory}`);
      console.log(`   Created: ${product.created_at}`);
      console.log('');
    });
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

checkDuplicates();
