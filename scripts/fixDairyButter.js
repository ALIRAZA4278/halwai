const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixDairyProducts() {
  console.log('Fixing Dairy products subcategories...\n');

  try {
    // Update Makhan Mania to DAIRY BUTTER subcategory
    console.log('Updating Makhan Mania to DAIRY BUTTER subcategory...');
    const { error: updateError1 } = await supabase
      .from('products')
      .update({ subcategory: 'DAIRY BUTTER' })
      .eq('name', 'Makhan Mania')
      .eq('subcategory', 'DAIRY');

    if (updateError1) {
      console.error('Error updating Makhan Mania:', updateError1);
    } else {
      console.log('✅ Makhan Mania updated to DAIRY BUTTER');
    }

    // Delete the old Pure Ghee from DAIRY
    console.log('\nDeleting Pure Ghee from DAIRY subcategory...');
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('name', 'Pure Ghee')
      .eq('subcategory', 'DAIRY');

    if (deleteError) {
      console.error('Error deleting Pure Ghee:', deleteError);
    } else {
      console.log('✅ Pure Ghee deleted from DAIRY');
    }

    console.log('\n✨ Done! Dairy products fixed.');
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

fixDairyProducts();
