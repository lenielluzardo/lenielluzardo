# Cloudflare Pages Deployment Guide

This directory contains all Cloudflare Pages-specific configuration files for deploying the Leniel Luzardo Portfolio.

## Files in This Directory

- `cloudflare-build-config.json` - Build configuration reference for Cloudflare Pages
- `cloudflare-cms-config.yml` - Decap CMS configuration using GitHub OAuth backend
- `DEPLOYMENT.md` - This file

## Prerequisites

- GitHub account with repository access
- Cloudflare account (free tier is sufficient)
- Node.js 20+ installed locally

## Why Cloudflare Pages?

- ✅ **Free unlimited bandwidth** (no credit limits)
- ✅ **Unlimited builds** on free tier
- ✅ **Better performance** (global CDN)
- ✅ **No authentication costs** (uses GitHub OAuth)
- ✅ **Simple configuration**

## Deployment Steps

### Part 1: Deploy to Cloudflare Pages

#### 1. Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Pages**
3. Click **"Create application"** → **"Connect to Git"**
4. Select your GitHub repository: `lenielluzardo/lenielluzardo`
5. Click **"Begin setup"**

#### 2. Configure Build Settings

Set the following configuration:

- **Project name**: `lenielluzardo-portfolio` (or your preference)
- **Production branch**: `main`
- **Framework preset**: `None` (we'll configure manually)
- **Build command**: `npm run build`
- **Build output directory**: `public`
- **Root directory**: `www`

Under **Environment variables**, add:
- **Variable name**: `NODE_VERSION`
- **Value**: `20`

#### 3. Deploy

1. Click **"Save and Deploy"**
2. Wait for the first build to complete (~2-3 minutes)
3. Your site will be available at: `https://lenielluzardo-portfolio.pages.dev`

#### 4. Custom Domain (Optional)

1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `lenielluzardo.com`)
4. Follow the DNS configuration instructions

### Part 2: Set Up GitHub OAuth for CMS

To use Decap CMS with Cloudflare Pages, you need GitHub OAuth authentication.

#### Option A: Using Cloudflare Workers (Recommended)

**1. Create GitHub OAuth App**

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Configure:
   - **Application name**: `Leniel Luzardo Portfolio CMS`
   - **Homepage URL**: `https://lenielluzardo-portfolio.pages.dev` (your Cloudflare URL)
   - **Authorization callback URL**: `https://lenielluzardo-portfolio.pages.dev/admin/cms/`
4. Click **"Register application"**
5. Note the **Client ID**
6. Click **"Generate a new client secret"** and save it securely

**2. Deploy OAuth Proxy with Cloudflare Workers**

You need an OAuth proxy to handle GitHub authentication. Use this open-source solution:

```bash
# Clone the oauth proxy
git clone https://github.com/vencax/netlify-cms-github-oauth-provider-cloudflare-worker
cd netlify-cms-github-oauth-provider-cloudflare-worker

# Install dependencies
npm install

# Configure wrangler.toml
# Add your GitHub OAuth credentials
```

In `wrangler.toml`:
```toml
name = "cms-oauth-proxy"
main = "src/index.js"
compatibility_date = "2024-01-01"

[vars]
OAUTH_CLIENT_ID = "your_github_client_id"

[[kv_namespaces]]
binding = "SESSIONS"
id = "your_kv_namespace_id"

[secrets]
OAUTH_CLIENT_SECRET = "your_github_client_secret"
```

Deploy the Worker:
```bash
npx wrangler publish
```

The Worker will be available at: `https://cms-oauth-proxy.your-subdomain.workers.dev`

**3. Update CMS Configuration**

Update `www/src/cms/config.yml` to use GitHub backend:

```yaml
backend:
  name: github
  repo: lenielluzardo/lenielluzardo
  branch: main
  base_url: https://cms-oauth-proxy.your-subdomain.workers.dev
  auth_endpoint: /auth
```

**4. Update CMS HTML**

Edit `www/src/cms/index.html` and comment out Netlify Identity:

```html
<!-- CLOUDFLARE PAGES DEPLOYMENT: Comment out these sections -->
<!-- 
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
-->

<!-- 
<script>
  // Netlify Identity initialization - DISABLED for Cloudflare
  if (window.netlifyIdentity) { ... }
</script>
-->
```

#### Option B: Using Alternative OAuth Services

Instead of Cloudflare Workers, you can use:

1. **Vercel Serverless Function** - Free serverless OAuth proxy
2. **Self-hosted OAuth server** - Full control, requires server
3. **Keep Netlify Functions** - Use Netlify just for OAuth (free tier)

For detailed instructions on these alternatives, see:
- [Decap CMS OAuth Backends](https://decapcms.org/docs/authentication-backends/)

### Part 3: Test Your Setup

1. **Test the site**: Visit your Cloudflare Pages URL
2. **Test the CMS**: Go to `/admin/cms/` and try logging in with GitHub
3. **Create a test post**: Create a draft blog post through the CMS
4. **Verify GitHub sync**: Check that the GitHub Action syncs to ll.db.blog

## Configuration Files

### Build Configuration

Cloudflare Pages reads build settings from the dashboard, but `cloudflare-build-config.json` serves as reference/documentation.

### CMS Configuration

Copy the Cloudflare CMS config to your main config location:

```powershell
# When ready to switch to Cloudflare
Copy-Item www\config\cloudflare\cloudflare-cms-config.yml www\src\cms\config.yml
```

Or keep both configs and switch as needed using environment-based logic.

## Environment Variables

No additional environment variables needed beyond `NODE_VERSION`. GitHub OAuth credentials are handled by your OAuth proxy.

## Troubleshooting

### Build Failures

1. Check build logs in Cloudflare Pages dashboard
2. Verify Node version is 20
3. Test build locally in `www/` directory:
   ```powershell
   cd www
   npm install
   npm run build
   ```

### CMS Login Issues

1. Verify GitHub OAuth App callback URL matches your Cloudflare URL
2. Check OAuth proxy Worker is deployed and accessible
3. Verify CMS config.yml has correct `base_url`
4. Check browser console for errors

### OAuth Proxy Issues

1. Verify Cloudflare Worker is published
2. Check Worker logs in Cloudflare dashboard
3. Verify GitHub OAuth Client ID and Secret are correct
4. Test OAuth endpoint directly: `https://your-worker.workers.dev/auth`

## Cost Comparison

### Cloudflare Pages Free Tier
- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ 500 builds/month
- ✅ Free custom domain
- ✅ Free SSL

### Netlify Free Tier (For Comparison)
- ⚠️ 100GB bandwidth/month
- ⚠️ 300 build minutes/month
- ⚠️ Can hit credit limits

## Switching from Netlify

If migrating from existing Netlify deployment:

1. **Deploy to Cloudflare** (keep Netlify running)
2. **Set up GitHub OAuth** (following steps above)
3. **Test thoroughly** on Cloudflare Pages URL
4. **Update DNS** when ready to switch
5. **Keep Netlify** as backup (free tier)

Both platforms can run simultaneously with no conflicts.

## Performance

Cloudflare Pages typically provides:
- Faster global CDN
- Better TTFB (Time To First Byte)
- More edge locations
- Built-in DDoS protection

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Decap CMS Documentation](https://decapcms.org/docs/)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)

## Quick Start Summary

1. ✅ Deploy to Cloudflare Pages (5 minutes)
2. ✅ Create GitHub OAuth App (5 minutes)
3. ✅ Deploy OAuth Worker (15 minutes)
4. ✅ Update CMS config.yml (2 minutes)
5. ✅ Test CMS login (2 minutes)

**Total time: ~30 minutes**
