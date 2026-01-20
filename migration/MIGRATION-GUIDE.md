# 🚀 Supabase Migration Guide / Supabase Migration Ki Guide

Complete guide to migrate your halwaiii app from old Supabase to new Supabase project.

Apne halwaiii app ko purane Supabase se naye Supabase project mein migrate karne ki complete guide.

---

## 📋 Migration Steps / Migration Ke Steps

### Step 1: Export Current Database Data

**English:** Export all data from your current Supabase database

**Urdu:** Apne current Supabase database se sara data export karein

```bash
node migration/1-export-data.js
```

**What this does / Ye kya karega:**
- Exports all products from database / Database se sab products export karega
- Creates JSON backup file / JSON backup file banayega
- Creates SQL INSERT statements / SQL INSERT statements banayega
- Lists all storage images / Storage ke sab images list karega

**Output files / Output files:**
- `migration/exported-data.json` - Complete data backup
- `migration/exported-data.sql` - SQL INSERT statements
- `migration/storage-files.json` - List of image files

---

### Step 2: Create New Supabase Project

**English:** Go to https://supabase.com and create a new project

**Urdu:** https://supabase.com par jaye aur naya project banaye

1. Click "New Project"
2. Choose organization
3. Enter project name (e.g., "halwaiii-new")
4. Set database password (SAVE THIS!)
5. Select region (closest to Pakistan/India for better performance)
6. Click "Create new project"
7. Wait 2-3 minutes for project setup

**Get your credentials / Apne credentials nikale:**
1. Go to Project Settings > API
2. Copy:
   - Project URL
   - Project API keys > `anon` `public`

---

### Step 3: Setup Database Schema

**English:** Run the schema SQL in your new Supabase SQL Editor

**Urdu:** Naye Supabase SQL Editor mein schema SQL chalaye

1. Open new Supabase Dashboard
2. Go to "SQL Editor"
3. Click "New Query"
4. Copy entire content from `migration/2-new-database-schema.sql`
5. Paste in SQL Editor
6. Click "Run" or press F5

**Expected result / Expected result:**
- Success message: "Success. No rows returned"
- Tables created
- Indexes created
- RLS policies created

---

### Step 4: Create Storage Bucket

**English:** Create storage bucket for product images

**Urdu:** Product images ke liye storage bucket banaye

1. In new Supabase Dashboard, go to "Storage"
2. Click "New bucket"
3. Name: `product-images`
4. Check "Public bucket" (if you want images publicly accessible)
5. Click "Create bucket"

**Setup Storage Policies:**
1. Click on `product-images` bucket
2. Go to "Policies" tab
3. Click "New Policy"
4. Choose "For full customization" > "Create policy"
5. Add these policies (or run commented SQL from schema file):
   - Allow public SELECT
   - Allow public INSERT
   - Allow public UPDATE
   - Allow public DELETE

---

### Step 5: Import Data to New Database

**English:** Update credentials and import data

**Urdu:** Credentials update karein aur data import karein

1. Open `migration/3-import-data.js`
2. Update these lines:
   ```javascript
   const NEW_SUPABASE_URL = 'YOUR_NEW_SUPABASE_URL';
   const NEW_SUPABASE_ANON_KEY = 'YOUR_NEW_SUPABASE_ANON_KEY';
   ```
3. Replace with your new project credentials
4. Save file
5. Run:
   ```bash
   node migration/3-import-data.js
   ```

**Expected output:**
- Shows batch import progress
- Reports number of products imported
- Shows success/failure count

---

### Step 6: Migrate Storage Images

**English:** Copy all images from old to new storage

**Urdu:** Sab images purane se naye storage mein copy karein

1. Open `migration/4-migrate-storage.js`
2. Update these lines:
   ```javascript
   const NEW_SUPABASE_URL = 'YOUR_NEW_SUPABASE_URL';
   const NEW_SUPABASE_ANON_KEY = 'YOUR_NEW_SUPABASE_ANON_KEY';
   ```
3. Replace with your new project credentials
4. Save file
5. Run:
   ```bash
   node migration/4-migrate-storage.js
   ```

**Expected output:**
- Downloads each image
- Uploads to new storage
- Shows progress for each file
- Reports success/failure count

---

### Step 7: Update Your App Configuration

**English:** Update your app to use new Supabase

**Urdu:** Apni app ko naya Supabase use karne ke liye update karein

1. Create backup of current `.env.local`:
   ```bash
   copy .env.local .env.local.backup
   ```

2. Open `.env.local`

3. Replace with new credentials:
   ```env
   # New Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=YOUR_NEW_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_NEW_SUPABASE_ANON_KEY
   ADMIN_EMAIL=admin@halwaiiiii.com
   ADMIN_PASSWORD=9wSAJafh3NZE
   ```

4. Save file

---

### Step 8: Test Your Application

**English:** Test everything works with new database

**Urdu:** Naye database ke sath sab kuch test karein

1. Start development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Test these features:
   - [ ] Home page loads
   - [ ] Products display correctly
   - [ ] Product images load
   - [ ] Categories work
   - [ ] Admin login works
   - [ ] Can add new product
   - [ ] Can edit product
   - [ ] Can delete product
   - [ ] Can upload images

---

## ✅ Migration Checklist / Migration Checklist

- [ ] Step 1: Exported current data (`exported-data.json` created)
- [ ] Step 2: Created new Supabase project
- [ ] Step 3: Ran schema SQL in new database
- [ ] Step 4: Created `product-images` storage bucket
- [ ] Step 5: Imported data successfully
- [ ] Step 6: Migrated all storage images
- [ ] Step 7: Updated `.env.local` with new credentials
- [ ] Step 8: Tested app and everything works
- [ ] Backup old credentials (just in case)

---

## 🔧 Troubleshooting / Problems Aur Solutions

### Problem 1: Export script fails

**Error:** "Invalid API credentials"

**Solution:**
- Check `.env.local` has correct current Supabase credentials
- Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set

---

### Problem 2: Import fails with RLS error

**Error:** "new row violates row-level security policy"

**Solution:**
- Make sure you ran the complete schema SQL (Step 3)
- Verify RLS policies are created in new Supabase dashboard
- Check: Dashboard > Authentication > Policies

---

### Problem 3: Storage migration fails

**Error:** "Bucket not found"

**Solution:**
- Create `product-images` bucket in new Supabase (Step 4)
- Make sure bucket name is exactly `product-images`
- Set bucket to public if images should be publicly accessible

---

### Problem 4: Images not loading in app

**Solution:**
- Check storage policies are set correctly
- Verify images uploaded to new bucket
- Check image URLs in products table point to new Supabase URL
- You may need to update image URLs in database

---

### Problem 5: Want to rollback to old database

**Solution:**
1. Restore `.env.local` from backup:
   ```bash
   copy .env.local.backup .env.local
   ```
2. Restart dev server
3. Old database will be used again

---

## 📞 Need Help? / Madad Chahiye?

If you face any issues during migration:

Agar migration mein koi problem aaye:

1. Check error messages carefully / Error messages dhyan se dekhe
2. Verify each step was completed / Har step complete hua hai check karein
3. Keep backup of old credentials / Purane credentials ka backup rakhe
4. You can always rollback / Aap hamesha rollback kar sakte hain

---

## 🎉 Migration Complete!

Once all steps are done and tested:

Jab sab steps complete aur test ho jaye:

1. Your app is now using new Supabase ✅
2. All data migrated successfully ✅
3. All images copied ✅
4. Old database is still intact (not deleted) ✅

**Optional cleanup:**
- You can delete old Supabase project if everything works
- Keep `migration` folder for future reference
- Keep `.env.local.backup` for safety

Congratulations! Migration successful! 🚀
