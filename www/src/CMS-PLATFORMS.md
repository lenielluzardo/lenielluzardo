# CMS Platform Configurations

This project maintains separate CMS configurations for different hosting platforms.

## Directory Structure

```
src/
├── cms/                # Active CMS configuration (current deployment)
├── cms.netlify/        # Netlify-specific configuration
└── cms.cloudflare/     # Cloudflare Pages-specific configuration
```

## Platform-Specific Directories

### cms.netlify/
- **Backend**: `git-gateway` (Netlify Identity)
- **Authentication**: Netlify Identity Widget
- **Use when**: Deploying to Netlify

### cms.cloudflare/
- **Backend**: `github` (GitHub OAuth)
- **Authentication**: GitHub OAuth via Cloudflare Worker
- **Use when**: Deploying to Cloudflare Pages

## How to Switch Platforms

### Switch to Netlify

```powershell
# Copy Netlify configuration to active cms directory
Remove-Item www\src\cms -Recurse -Force
Copy-Item -Recurse www\src\cms.netlify www\src\cms

# Rebuild the site
cd www
npm run build
```

### Switch to Cloudflare

```powershell
# Copy Cloudflare configuration to active cms directory
Remove-Item www\src\cms -Recurse -Force
Copy-Item -Recurse www\src\cms.cloudflare www\src\cms

# Update the OAuth Worker URL in config.yml
# Edit www/src/cms/config.yml and replace:
# base_url: https://cms-oauth-proxy.your-subdomain.workers.dev

# Rebuild the site
cd www
npm run build
```

## Current Active Configuration

The `cms/` directory contains the currently active configuration. Check the comments in `cms/config.yml` to see which platform is active.

## Deployment Notes

### Netlify Deployment
1. `cms/` should contain the Netlify configuration
2. Uses `git-gateway` backend
3. Requires Netlify Identity to be enabled in Netlify dashboard
4. No additional OAuth setup needed

### Cloudflare Pages Deployment
1. `cms/` should contain the Cloudflare configuration
2. Uses `github` backend with OAuth Worker
3. Requires:
   - GitHub OAuth App (see [config/cloudflare/DEPLOYMENT.md](../config/cloudflare/DEPLOYMENT.md))
   - Cloudflare Worker for OAuth proxy deployed
   - Worker URL updated in `config.yml`

## Keeping Both Configurations

The platform-specific directories (`cms.netlify/` and `cms.cloudflare/`) are preserved so you can:
- Quickly switch between platforms
- Keep backup configurations
- Test on different platforms
- Maintain separate settings if needed

## Important

After switching configurations, always:
1. ✅ Update `cms/config.yml` if needed (e.g., OAuth Worker URL for Cloudflare)
2. ✅ Rebuild the site with `npm run build`
3. ✅ Test the CMS at `/admin/cms/` before deploying
4. ✅ Commit changes to Git

## Files in Each Directory

Each platform directory contains:
- `config.yml` - Decap CMS configuration
- `index.html` - CMS admin page with platform-specific scripts

The collections, media settings, and other CMS features remain the same across platforms - only the authentication backend changes.
