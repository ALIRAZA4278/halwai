const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// ⚠️ IMPORTANT: Update these with your NEW Supabase project credentials
const NEW_SUPABASE_URL = 'https://nsozofwkweobqrilibtu.supabase.co';
const NEW_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zb3pvZndrd2VvYnFyaWxpYnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjcxODAsImV4cCI6MjA4MTY0MzE4MH0.Jkif_NyK_2FuzAHqNQXJtuKCaF7mPWunfyBPSGRa-n4';

const supabase = createClient(NEW_SUPABASE_URL, NEW_SUPABASE_ANON_KEY);

async function importData() {
  try {
    console.log('🚀 Starting data import to new Supabase...\n');

    // Read exported data
    const dataFile = path.join(__dirname, 'exported-data.json');

    if (!fs.existsSync(dataFile)) {
      console.error('❌ exported-data.json not found!');
      console.log('Please run 1-export-data.js first');
      process.exit(1);
    }

    const exportData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const products = exportData.tables.products;

    console.log(`📦 Found ${products.length} products to import`);

    // Import products in batches
    const batchSize = 100;
    let imported = 0;
    let failed = 0;

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);

      console.log(`\n📤 Importing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(products.length / batchSize)}...`);

      const { data, error } = await supabase
        .from('products')
        .insert(batch)
        .select();

      if (error) {
        console.error('❌ Error importing batch:', error.message);
        failed += batch.length;

        // Try importing one by one to identify problematic records
        console.log('⚠️  Trying individual imports...');
        for (const product of batch) {
          const { error: individualError } = await supabase
            .from('products')
            .insert(product)
            .select();

          if (individualError) {
            console.error(`   ❌ Failed: ${product.name} - ${individualError.message}`);
            failed++;
          } else {
            console.log(`   ✅ Success: ${product.name}`);
            imported++;
          }
        }
      } else {
        imported += batch.length;
        console.log(`✅ Imported ${batch.length} products`);
      }
    }

    console.log('\n✨ Import completed!');
    console.log('\n📋 Summary:');
    console.log(`   - Total products: ${products.length}`);
    console.log(`   - Successfully imported: ${imported}`);
    console.log(`   - Failed: ${failed}`);

    if (imported > 0) {
      console.log('\n✅ Data migration successful!');
      console.log('\n📝 Next steps:');
      console.log('   1. Verify data in new Supabase dashboard');
      console.log('   2. Run 4-migrate-storage.js to copy images');
      console.log('   3. Update .env.local with new credentials');
    }

  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Validate configuration
if (NEW_SUPABASE_URL === 'YOUR_NEW_SUPABASE_URL' || NEW_SUPABASE_ANON_KEY === 'YOUR_NEW_SUPABASE_ANON_KEY') {
  console.error('❌ Please update NEW_SUPABASE_URL and NEW_SUPABASE_ANON_KEY in this file first!');
  console.log('\n📝 Instructions:');
  console.log('   1. Create a new Supabase project at https://supabase.com');
  console.log('   2. Get your project URL and anon key from Settings > API');
  console.log('   3. Update the constants at the top of this file');
  console.log('   4. Run the schema SQL (2-new-database-schema.sql) in SQL Editor');
  console.log('   5. Run this script again: node migration/3-import-data.js');
  process.exit(1);
}

importData();
