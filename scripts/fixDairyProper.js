const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixDairy() {
  console.log('Fixing Dairy products properly...\n');

  try {
    // Delete all products from old DAIRY subcategory
    console.log('Deleting all old DAIRY subcategory products...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('subcategory', 'DAIRY');

    if (deleteError) {
      console.error('Error deleting:', deleteError);
      throw deleteError;
    }
    console.log('✅ Old DAIRY products deleted');

    // Insert Makhan Mania with correct subcategory
    console.log('\nInserting Makhan Mania into DAIRY BUTTER...');
    const { error: insertError1 } = await supabase
      .from('products')
      .insert([{
        name: "Makhan Mania",
        base_price: 839.00,
        description: "Makhan Mania Dairy Butter. Made from the finest quality ingredients, With its rich and creamy texture, it spreads smoothly on your favorite breads, toasts, and crackers, enhancing the flavors with every bite.",
        image_url: "https://assets.indolj.io/upload/1760432756-Makhan-Mania.jpg",
        category: "DAIRY",
        subcategory: "DAIRY BUTTER",
        tag: null,
        variants: [
          { size: "400gm", price: 839.00, available: true }
        ]
      }]);

    if (insertError1) {
      console.error('Error inserting Makhan Mania:', insertError1);
      throw insertError1;
    }
    console.log('✅ Makhan Mania inserted into DAIRY BUTTER');

    console.log('\n✨ Done! Dairy products fixed properly.');
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

fixDairy();
