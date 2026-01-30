# Platform Configuration Directory

This directory contains platform-specific configurations for deploying the Leniel Luzardo Portfolio to different hosting providers.

## Directory Structure

```
config/
├── netlify/
│   ├── DEPLOYMENT.md              # Netlify deployment guide
│   ├── netlify.toml               # Netlify configuration (copy)
│   └── netlify-cms-config.yml     # CMS config for Netlify Identity
│
└── cloudflare/
    ├── DEPLOYMENT.md              # Cloudflare Pages deployment guide
    ├── cloudflare-build-config.json  # Build configuration reference
    └── cloudflare-cms-config.yml  # CMS config for GitHub OAuth
```

## Purpose

This organization allows you to:
- ✅ **Maintain multiple deployment options** without conflicts
- ✅ **Keep Netlify configuration** while testing Cloudflare
- ✅ **Switch platforms easily** by swapping config files
- ✅ **Document platform-specific setup** in dedicated guides

## Active Configuration

The main configuration files used by the application are:
- `www/netlify.toml` - Currently active for Netlify (in project root)
- `www/src/cms/config.yml` - Currently using Netlify Identity (git-gateway)
- `www/src/cms/index.html` - Currently configured for Netlify Identity

## Switching Platforms

### Currently Using: Netlify

Your project is currently configured for Netlify with:
- Backend: `git-gateway` (Netlify Identity)
- Authentication: Netlify Identity Widget
- Build: Automatic via `netlify.toml`

### To Switch to Cloudflare Pages:

**1. Update CMS Configuration**
```powershell
# Backup current config
Copy-Item www\src\cms\config.yml www\src\cms\config.yml.netlify.backup

# Switch to Cloudflare config
Copy-Item www\config\cloudflare\cloudflare-cms-config.yml www\src\cms\config.yml
```

**2. Update CMS HTML**

Edit `www/src/cms/index.html` and comment out Netlify Identity sections (instructions are in the file comments).

**3. Set Up GitHub OAuth**

Follow the detailed instructions in [cloudflare/DEPLOYMENT.md](cloudflare/DEPLOYMENT.md).

**4. Deploy to Cloudflare Pages**

Follow the deployment guide in [cloudflare/DEPLOYMENT.md](cloudflare/DEPLOYMENT.md).

### To Switch Back to Netlify:

```powershell
# Restore Netlify config
Copy-Item www\src\cms\config.yml.netlify.backup www\src\cms\config.yml

# Uncomment Netlify Identity scripts in www/src/cms/index.html
```

## Platform Comparison

### Netlify
- **Pros**: Easy setup, integrated authentication, familiar workflow
- **Cons**: Credit limits (100GB bandwidth/month), can pause projects
- **Best for**: Quick prototypes, integrated identity needs

### Cloudflare Pages
- **Pros**: Unlimited bandwidth, better performance, no credit limits
- **Cons**: Requires OAuth setup, slightly more configuration
- **Best for**: Production sites, high traffic, professional deployments

## Configuration Files Explained

### Netlify Identity vs GitHub OAuth

**Netlify Identity** (`git-gateway` backend):
- Managed authentication service
- Built into Netlify
- No OAuth setup needed
- Limited to 1,000 active users (free tier)

**GitHub OAuth** (`github` backend):
- Users authenticate with GitHub accounts
- Free forever
- Requires OAuth app setup
- Works with any hosting provider

### Build Configuration

Both platforms use the same Eleventy build process:
```bash
npm run build  # Builds to www/public/
```

The only difference is how build settings are configured:
- **Netlify**: `netlify.toml` in `www/` directory
- **Cloudflare**: Dashboard configuration (with JSON reference file)

## Deployment Guides

- **Netlify**: See [netlify/DEPLOYMENT.md](netlify/DEPLOYMENT.md)
- **Cloudflare Pages**: See [cloudflare/DEPLOYMENT.md](cloudflare/DEPLOYMENT.md)

## Best Practice

**Recommendation**: Set up both platforms and keep both deployments running:

1. **Netlify** (`lenielluzardo.netlify.app`): 
   - Staging environment
   - Easy CMS access for testing
   - Backup deployment

2. **Cloudflare Pages** (`lenielluzardo.com`): 
   - Production environment
   - Better performance
   - No credit limit concerns

Point your custom domain to Cloudflare while keeping Netlify as a backup.

## Questions?

- For Netlify-specific questions: [netlify/DEPLOYMENT.md](netlify/DEPLOYMENT.md)
- For Cloudflare-specific questions: [cloudflare/DEPLOYMENT.md](cloudflare/DEPLOYMENT.md)
- For CMS issues: Check [Decap CMS Documentation](https://decapcms.org/docs/)
