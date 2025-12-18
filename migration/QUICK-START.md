# ⚡ Quick Migration Commands

Run these commands in order:

## 1️⃣ Export Current Data
```bash
node migration/1-export-data.js
```

## 2️⃣ Create New Supabase Project
- Go to https://supabase.com
- Click "New Project"
- Save URL and anon key

## 3️⃣ Run Schema SQL
- Open new Supabase Dashboard
- Go to SQL Editor
- Copy/paste: `migration/2-new-database-schema.sql`
- Click Run

## 4️⃣ Create Storage Bucket
- Go to Storage in dashboard
- Create bucket: `product-images`
- Make it public

## 5️⃣ Update Import Script
Edit `migration/3-import-data.js`:
```javascript
const NEW_SUPABASE_URL = 'your-new-url';
const NEW_SUPABASE_ANON_KEY = 'your-new-key';
```

## 6️⃣ Import Data
```bash
node migration/3-import-data.js
```

## 7️⃣ Update Storage Script
Edit `migration/4-migrate-storage.js`:
```javascript
const NEW_SUPABASE_URL = 'your-new-url';
const NEW_SUPABASE_ANON_KEY = 'your-new-key';
```

## 8️⃣ Migrate Images
```bash
node migration/4-migrate-storage.js
```

## 9️⃣ Update App Config
Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-new-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-new-key
```

## 🔟 Test App
```bash
npm run dev
```

Open http://localhost:3000 and test everything!

---

## 🆘 Rollback (If Needed)
```bash
copy .env.local.backup .env.local
npm run dev
```

---

## ✅ Done!
Your app is now running on new Supabase! 🎉
