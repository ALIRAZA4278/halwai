require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Current Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function exportData() {
  try {
    console.log('🚀 Starting data export from current Supabase...\n');

    // Create migration directory if it doesn't exist
    const migrationDir = path.join(__dirname);
    if (!fs.existsSync(migrationDir)) {
      fs.mkdirSync(migrationDir, { recursive: true });
    }

    // Export products table
    console.log('📦 Exporting products...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (productsError) {
      console.error('❌ Error exporting products:', productsError);
      throw productsError;
    }

    console.log(`✅ Exported ${products.length} products`);

    // Save to JSON file
    const dataFile = path.join(migrationDir, 'exported-data.json');
    const exportData = {
      exported_at: new Date().toISOString(),
      source_url: supabaseUrl,
      tables: {
        products: products
      }
    };

    fs.writeFileSync(dataFile, JSON.stringify(exportData, null, 2));
    console.log(`\n✅ Data exported successfully to: ${dataFile}`);

    // Generate SQL INSERT statements
    console.log('\n📝 Generating SQL INSERT statements...');
    const sqlFile = path.join(migrationDir, 'exported-data.sql');
    let sqlContent = `-- Data export from ${supabaseUrl}\n`;
    sqlContent += `-- Exported at: ${new Date().toISOString()}\n\n`;

    if (products.length > 0) {
      sqlContent += `-- Products table data\n`;
      products.forEach(product => {
        const values = [
          `'${product.id}'`,
          `'${product.name.replace(/'/g, "''")}'`,
          product.base_price,
          product.description ? `'${product.description.replace(/'/g, "''")}'` : 'NULL',
          product.image_url ? `'${product.image_url.replace(/'/g, "''")}'` : 'NULL',
          product.category ? `'${product.category.replace(/'/g, "''")}'` : 'NULL',
          product.subcategory ? `'${product.subcategory.replace(/'/g, "''")}'` : 'NULL',
          product.tag ? `'${product.tag.replace(/'/g, "''")}'` : 'NULL',
          `'${JSON.stringify(product.variants).replace(/'/g, "''")}'::jsonb`,
          `'${product.created_at}'`,
          `'${product.updated_at}'`
        ];
        sqlContent += `INSERT INTO products (id, name, base_price, description, image_url, category, subcategory, tag, variants, created_at, updated_at) VALUES (${values.join(', ')});\n`;
      });
    }

    fs.writeFileSync(sqlFile, sqlContent);
    console.log(`✅ SQL file created: ${sqlFile}`);

    // List all images in storage
    console.log('\n🖼️  Listing storage images...');
    const { data: files, error: storageError } = await supabase
      .storage
      .from('product-images')
      .list();

    if (storageError) {
      console.log('⚠️  Storage bucket not accessible or empty:', storageError.message);
    } else {
      console.log(`✅ Found ${files.length} files in storage`);

      // Save file list
      const storageFile = path.join(migrationDir, 'storage-files.json');
      fs.writeFileSync(storageFile, JSON.stringify(files, null, 2));
      console.log(`✅ Storage file list saved: ${storageFile}`);
    }

    console.log('\n✨ Export completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - Products: ${products.length}`);
    console.log(`   - Storage files: ${files?.length || 0}`);
    console.log(`\n📁 Files created:`);
    console.log(`   - ${dataFile}`);
    console.log(`   - ${sqlFile}`);
    if (files?.length > 0) {
      console.log(`   - ${storageFile}`);
    }

  } catch (error) {
    console.error('\n❌ Export failed:', error.message);
    process.exit(1);
  }
}

exportData();
