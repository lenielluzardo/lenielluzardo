# 🚀 Quick Start: Netlify CMS

## Setup in 5 Minutes

### 1️⃣ Push to GitHub
```bash
git add .
git commit -m "Add Netlify CMS"
git push origin main
```

### 2️⃣ Deploy to Netlify
1. Go to [netlify.com](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Select your GitHub repo: `lenielluzardo/lenielluzardo`
4. Click "Deploy site" (settings auto-detected from `netlify.toml`)

### 3️⃣ Enable Identity & Git Gateway
1. In Netlify dashboard: **Site settings** → **Identity**
2. Click **Enable Identity**
3. Set **Registration** to **Invite only**
4. Enable **Git Gateway** under Services

### 4️⃣ Invite Yourself
1. **Identity** tab → **Invite users**
2. Enter your email
3. Check email → Accept invitation → Set password

### 5️⃣ Start Editing! 🎉
Visit: `https://your-site.netlify.app/admin/cms/`

## What You Can Do

✅ **Create & edit blog posts** - Full markdown editor  
✅ **Manage projects** - Add to portfolio  
✅ **Upload images** - Drag & drop support  
✅ **Change site settings** - Toggle features  
✅ **Draft workflow** - Review before publishing  
✅ **Auto-deploy** - Changes go live automatically  

## First Steps in CMS

1. **Login** with Netlify Identity
2. **Create a post**: Collections → Blog Posts → New Blog Post
3. **Write content** using markdown editor
4. **Save draft** or **Publish** immediately
5. **Your site rebuilds** automatically!

## Important Notes

⚠️ **Update Repository**: Edit `src/cms/config.yml` line 3:
```yaml
repo: YOUR_USERNAME/YOUR_REPO
```

💡 **Editorial Workflow**: By default, publishing creates a pull request. Merge it to go live.

💡 **Instant Publishing**: Change `publish_mode: simple` in config.yml

## Local Testing

Test CMS locally before deploying:

```bash
# Terminal 1
npx decap-server

# Terminal 2  
npm start
```

Visit: `http://localhost:8080/admin/cms/`

## Need Help?

📖 [Full Setup Guide](NETLIFY_CMS_SETUP.md)  
🌐 [Decap CMS Docs](https://decapcms.org/)  
💬 [Netlify Support](https://answers.netlify.com/)

## Still Using GitHub Pages?

If you prefer GitHub Pages:
- Use `/admin/content/` (local content manager)
- Edit files locally and push to GitHub
- Netlify CMS requires Netlify deployment
