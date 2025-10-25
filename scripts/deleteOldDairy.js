const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteOldDairy() {
  console.log('Deleting old dairy products with wrong subcategories...\n');

  try {
    // Delete by specific IDs
    const idsToDelete = [
      'bfe24442-be83-43ba-aaa8-54d0237bcaeb', // Old Makhan Mania with DAIRY subcategory
      '8ac00122-9a15-4e63-b080-c2ae86e7caec'  // Old Pure Ghee with DAIRY subcategory
    ];

    for (const id of idsToDelete) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error(`Error deleting ${id}:`, error);
      } else {
        console.log(`✅ Deleted product ${id}`);
      }
    }

    console.log('\n✨ Done! Old dairy products deleted.');
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

deleteOldDairy();
