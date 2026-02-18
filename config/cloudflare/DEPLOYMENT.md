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
   - **Authorization callback URL**: ``https://lenielluzardo-portfolio.pages.dev/admin/cms/
4. Click **"Register application"**
5. Note the **Client ID**
6. Click **"Generate a new client secret"** and save it securely

**2. Deploy OAuth Proxy with Cloudflare Workers**

You need an OAuth proxy to handle GitHub authentication. Here are working solutions:

**Option 2A: Simple Cloudflare Worker (Recommended)**

Create a new Cloudflare Worker manually:

1. In Cloudflare Dashboard, go to **Workers & Pages** → **Create application** → **Workers** tab
2. Click **"Create Worker"**
3. Name it: `cms-oauth-proxy`
4. Replace the default code with this OAuth proxy code:

```javascript
// GitHub OAuth proxy for Decap CMS
// IMPORTANT: Decap CMS expects { token, provider } NOT GitHub's raw { access_token, token_type, scope }
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // /auth - Redirect user to GitHub OAuth authorization page
    if (url.pathname === '/auth') {
      const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
      githubAuthUrl.searchParams.set('client_id', env.OAUTH_CLIENT_ID);
      githubAuthUrl.searchParams.set('scope', 'repo,user');
      githubAuthUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
      return Response.redirect(githubAuthUrl.toString(), 302);
    }

    // /callback - Exchange code for token and notify CMS via postMessage
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('Missing code parameter', { status: 400 });
      }

      // Exchange authorization code for access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.OAUTH_CLIENT_ID,
          client_secret: env.OAUTH_CLIENT_SECRET,
          code: code,
        }),
      });

      const data = await tokenResponse.json();

      // Handle GitHub error response
      if (data.error || !data.access_token) {
        const errMsg = data.error_description || data.error || 'Unknown error';
        const content = `<!DOCTYPE html><html><body><script>
(function() {
  window.opener.postMessage(
    "authorization:github:error:" + JSON.stringify({ message: ${JSON.stringify(errMsg)} }),
    "*"
  );
  setTimeout(function() { window.close(); }, 1000);
})();
</script><p>Authorization failed: ${errMsg}</p></body></html>`;
        return new Response(content, { headers: { 'Content-Type': 'text/html' } });
      }

      // Transform to Decap CMS expected format: { token, provider }
      // GitHub returns { access_token, token_type, scope } but Decap CMS needs { token, provider }
      const cmsTokenData = { token: data.access_token, provider: 'github' };

      const content = `<!DOCTYPE html>
<html><head><title>Authorizing...</title></head>
<body>
<script>
(function() {
  var data = ${JSON.stringify(cmsTokenData)};
  var msg = "authorization:github:success:" + JSON.stringify(data);
  window.opener.postMessage(msg, "*");
  setTimeout(function() { window.close(); }, 1000);
})();
</script>
<p>Authorized! This window will close automatically.</p>
</body></html>`;

      return new Response(content, { headers: { 'Content-Type': 'text/html' } });
    }

    return new Response('OAuth Proxy for Decap CMS', { headers: corsHeaders });
  }
};
```

5. Click **"Save and Deploy"**

6. Add environment variables:
   - Go to **Settings** → **Variables**
   - Add `OAUTH_CLIENT_ID` (your GitHub OAuth Client ID)
   - Add `OAUTH_CLIENT_SECRET` (your GitHub OAuth Secret) - mark as encrypted

7. Your Worker will be available at: `https://cms-oauth-proxy.your-subdomain.workers.dev`

**Option 2B: Use External OAuth Service**

Use a third-party OAuth proxy service:
- **GitHub OAuth App** with direct authentication (see Option B below)
- **Decap CMS GitHub Gateway** - https://github.com/decaporg/decap-cms (check their documentation)

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

Instead of Cloudflare Workers, you can use simpler alternatives:

**1. Keep Netlify for Auth Only (Easiest)**
- Deploy your site to Cloudflare Pages
- Keep Netlify Identity service for CMS authentication (free tier)
- Your CMS config stays the same (git-gateway)
- No OAuth Worker needed!

Steps:
1. Keep your Netlify site active (or create a minimal one just for Identity)
2. Use Netlify Identity for CMS authentication
3. Your CMS continues to use `git-gateway` backend
4. Site hosted on Cloudflare, auth handled by Netlify

This is the **simplest option** - you get Cloudflare's unlimited bandwidth while keeping Netlify's easy authentication.

**2. GitHub Backend with Personal Access Token (For Solo Dev)**
Update `www/src/cms/config.yml`:
```yaml
backend:
  name: github
  repo: lenielluzardo/lenielluzardo
  branch: main
  # No OAuth needed for local development
```

Then use Decap CMS with GitHub authentication directly (requires being logged into GitHub).

**3. Vercel Serverless Function** - Free OAuth proxy on Vercel
**4. Self-hosted OAuth server** - Full control, requires server

For detailed instructions on these alternatives, see:
- [Decap CMS Authentication Backends](https://decapcms.org/docs/authentication-backends/)

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
