const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllDairy() {
  console.log('Checking all Dairy-related products...\n');

  try {
    // Check DAIRY BUTTER
    const { data: butterData, error: butterError } = await supabase
      .from('products')
      .select('*')
      .eq('subcategory', 'DAIRY BUTTER');

    if (butterError) {
      console.error('Error fetching DAIRY BUTTER:', butterError);
    } else {
      console.log(`DAIRY BUTTER subcategory: ${butterData.length} products`);
      butterData.forEach(p => console.log(`  - ${p.name}`));
    }

    // Check PURE GHEE
    const { data: gheeData, error: gheeError } = await supabase
      .from('products')
      .select('*')
      .eq('subcategory', 'PURE GHEE');

    if (gheeError) {
      console.error('Error fetching PURE GHEE:', gheeError);
    } else {
      console.log(`\nPURE GHEE subcategory: ${gheeData.length} products`);
      gheeData.forEach(p => console.log(`  - ${p.name}`));
    }

    // Check old DAIRY
    const { data: oldDairyData, error: oldDairyError } = await supabase
      .from('products')
      .select('*')
      .eq('subcategory', 'DAIRY');

    if (oldDairyError) {
      console.error('Error fetching DAIRY:', oldDairyError);
    } else {
      console.log(`\nOld DAIRY subcategory: ${oldDairyData.length} products`);
      oldDairyData.forEach(p => console.log(`  - ${p.name}`));
    }
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

checkAllDairy();
