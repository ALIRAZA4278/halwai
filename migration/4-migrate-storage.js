require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Old Supabase (source)
const oldSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const oldSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const oldSupabase = createClient(oldSupabaseUrl, oldSupabaseKey);

// New Supabase (destination)
const NEW_SUPABASE_URL = 'https://nsozofwkweobqrilibtu.supabase.co';
const NEW_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zb3pvZndrd2VvYnFyaWxpYnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjcxODAsImV4cCI6MjA4MTY0MzE4MH0.Jkif_NyK_2FuzAHqNQXJtuKCaF7mPWunfyBPSGRa-n4';
const newSupabase = createClient(NEW_SUPABASE_URL, NEW_SUPABASE_ANON_KEY);

const BUCKET_NAME = 'product-images';

// Download file from URL
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function migrateStorage() {
  try {
    console.log('🚀 Starting storage migration...\n');

    // Create temp directory for downloads
    const tempDir = path.join(__dirname, 'temp-images');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Check if bucket is accessible in new Supabase
    console.log('🪣 Checking storage bucket in new Supabase...');
    const { data: testFiles, error: testError } = await newSupabase
      .storage
      .from(BUCKET_NAME)
      .list();

    if (testError) {
      console.log('\n⚠️  Storage bucket does not exist or is not accessible!');
      console.log('   Error:', testError.message);
      console.log('\n📝 Please create the bucket first:');
      console.log('   1. Go to your new Supabase Dashboard');
      console.log('   2. Navigate to Storage');
      console.log(`   3. Create a new bucket named: ${BUCKET_NAME}`);
      console.log('   4. Make it public (optional, based on your needs)');
      console.log('   5. Run this script again\n');
      process.exit(1);
    }

    console.log('✅ Bucket is accessible\n');

    // List all files from old storage
    console.log('📂 Listing files from old storage...');
    const { data: files, error: listError } = await oldSupabase
      .storage
      .from(BUCKET_NAME)
      .list();

    if (listError) {
      console.error('❌ Error listing files:', listError.message);
      throw listError;
    }

    console.log(`✅ Found ${files.length} files to migrate\n`);

    if (files.length === 0) {
      console.log('ℹ️  No files to migrate. Migration complete!');
      return;
    }

    let migrated = 0;
    let failed = 0;

    // Migrate each file
    for (const file of files) {
      try {
        console.log(`📤 Migrating: ${file.name}`);

        // Get public URL from old storage
        const { data: urlData } = oldSupabase
          .storage
          .from(BUCKET_NAME)
          .getPublicUrl(file.name);

        const fileUrl = urlData.publicUrl;
        const tempFilePath = path.join(tempDir, file.name);

        // Download file
        console.log(`   ⬇️  Downloading...`);
        await downloadFile(fileUrl, tempFilePath);

        // Read file
        const fileBuffer = fs.readFileSync(tempFilePath);

        // Upload to new storage
        console.log(`   ⬆️  Uploading to new storage...`);
        const { error: uploadError } = await newSupabase
          .storage
          .from(BUCKET_NAME)
          .upload(file.name, fileBuffer, {
            contentType: file.metadata?.mimetype || 'image/jpeg',
            upsert: true
          });

        if (uploadError) {
          console.error(`   ❌ Upload failed: ${uploadError.message}`);
          failed++;
        } else {
          console.log(`   ✅ Success!`);
          migrated++;
        }

        // Clean up temp file
        fs.unlinkSync(tempFilePath);

      } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
        failed++;
      }
    }

    // Clean up temp directory
    try {
      fs.rmdirSync(tempDir);
    } catch (e) {
      // Ignore cleanup errors
    }

    console.log('\n✨ Storage migration completed!');
    console.log('\n📋 Summary:');
    console.log(`   - Total files: ${files.length}`);
    console.log(`   - Successfully migrated: ${migrated}`);
    console.log(`   - Failed: ${failed}`);

    if (migrated > 0) {
      console.log('\n✅ Storage migration successful!');
      console.log('\n📝 Next step:');
      console.log('   - Update .env.local with new Supabase credentials');
      console.log('   - Test your application with new database');
    }

  } catch (error) {
    console.error('\n❌ Storage migration failed:', error.message);
    process.exit(1);
  }
}

// Validate configuration
if (NEW_SUPABASE_URL === 'YOUR_NEW_SUPABASE_URL' || NEW_SUPABASE_ANON_KEY === 'YOUR_NEW_SUPABASE_ANON_KEY') {
  console.error('❌ Please update NEW_SUPABASE_URL and NEW_SUPABASE_ANON_KEY in this file first!');
  console.log('\n📝 Instructions:');
  console.log('   1. Get your new project URL and anon key from Settings > API');
  console.log('   2. Update the constants at the top of this file');
  console.log('   3. Create the storage bucket in new Supabase dashboard');
  console.log('   4. Run this script: node migration/4-migrate-storage.js');
  process.exit(1);
}

migrateStorage();
