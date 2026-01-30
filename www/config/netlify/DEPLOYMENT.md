# Netlify Deployment Guide

This directory contains all Netlify-specific configuration files for deploying the Leniel Luzardo Portfolio.

## Files in This Directory

- `netlify.toml` - Main Netlify configuration (build settings, redirects, environment)
- `netlify-cms-config.yml` - Decap CMS configuration using Netlify Identity and Git Gateway

## Prerequisites

- GitHub account with repository access
- Netlify account (free tier is sufficient)
- Node.js 20+ installed locally

## Deployment Steps

### 1. Initial Setup

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select your repository: `lenielluzardo/lenielluzardo`

### 2. Build Configuration

Netlify will auto-detect the `netlify.toml` file in the `www/` directory. Verify these settings:

- **Base directory**: `www`
- **Build command**: `npm run build`
- **Publish directory**: `public`
- **Node version**: 20

### 3. Enable Netlify Identity

1. Go to **Site settings** → **Identity**
2. Click **"Enable Identity"**
3. Under **Registration preferences**, select **"Invite only"** (recommended)
4. Under **External providers**, enable **GitHub** (optional, for easier login)

### 4. Enable Git Gateway

1. In **Identity** settings, scroll to **Services**
2. Click **"Enable Git Gateway"**
3. This allows Decap CMS to commit directly to your repository

### 5. Invite Yourself as Admin

1. Go to **Identity** tab
2. Click **"Invite users"**
3. Enter your email address
4. Check your email and accept the invitation
5. Set your password

### 6. Access the CMS

Once deployed, access your CMS at:
```
https://your-site.netlify.app/admin/cms/
```

Log in with your Netlify Identity credentials.

## Configuration Files

### netlify.toml Location

The `netlify.toml` file should be in the root of your `www/` directory:
```
www/
  netlify.toml  ← Main configuration
  config/
    netlify/
      netlify.toml  ← Backup copy
```

### CMS Configuration

The CMS uses the config file at `www/src/cms/config.yml` which is configured for:
- Backend: `git-gateway` (Netlify Identity)
- Branch: `main`
- Editorial workflow enabled (draft/review/publish)

## Environment Variables

No additional environment variables needed for Netlify deployment. Netlify Identity is managed through the Netlify dashboard.

## Troubleshooting

### CMS Login Issues

1. Verify Netlify Identity is enabled
2. Check that Git Gateway is enabled
3. Ensure you've accepted the identity invitation
4. Try incognito mode to clear cache

### Build Failures

1. Check build logs in Netlify dashboard
2. Verify Node version is 20
3. Ensure all dependencies are in `package.json`
4. Test build locally: `npm run build`

### Redirect Issues

The `netlify.toml` includes redirects for:
- Admin route protection
- SPA client-side routing

If redirects don't work, verify `netlify.toml` is in the `www/` directory.

## Cost

Netlify free tier includes:
- 100GB bandwidth/month
- 300 build minutes/month
- Netlify Identity (1,000 active users)

If you hit limits, consider migrating to Cloudflare Pages (see `../cloudflare/DEPLOYMENT.md`).

## Switching to Cloudflare

If you decide to switch to Cloudflare Pages:
1. Keep this Netlify deployment as backup
2. Follow instructions in `../cloudflare/DEPLOYMENT.md`
3. Update DNS records when ready
4. Both configurations can coexist

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
