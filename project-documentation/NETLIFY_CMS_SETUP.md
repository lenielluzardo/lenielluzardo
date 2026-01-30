# Netlify CMS Setup Guide

This site includes **Netlify CMS (Decap CMS)** for content management, allowing you to edit blog posts and projects directly from a web interface.

## Quick Start

### 1. Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Deploy settings should auto-detect from `netlify.toml`

### 2. Enable Netlify Identity

After deployment:

1. Go to your site's dashboard on Netlify
2. Navigate to **Site settings** → **Identity**
3. Click **Enable Identity**
4. Under **Registration preferences**, select **Invite only** (recommended)
5. Under **External providers**, enable **GitHub** (optional but recommended)

### 3. Enable Git Gateway

1. Still in **Identity** settings
2. Scroll to **Services** → **Git Gateway**
3. Click **Enable Git Gateway**
4. This allows the CMS to commit directly to your GitHub repo

### 4. Invite Users

1. Go to **Identity** tab in your Netlify dashboard
2. Click **Invite users**
3. Enter your email address
4. Check your email and accept the invitation
5. Set your password

### 5. Access the CMS

Visit: `https://your-site.netlify.app/admin/cms/`

- Login with your Netlify Identity credentials
- You can now create, edit, and publish content!

## CMS Features

### Blog Posts
- Create new posts with markdown editor
- Rich text formatting
- Add tags and metadata
- Draft/publish workflow
- Upload images

### Projects
- Manage portfolio projects
- Add technologies used
- Set display order
- Include project links and GitHub repos

### Site Settings
- Toggle features on/off
- Customize CTA text
- Configure newsletter settings
- Manage contact information

## Workflow

### Editorial Workflow (Default)

The CMS uses an editorial workflow:

1. **Draft**: Create new content (saved as draft)
2. **Review**: Submit for review
3. **Publish**: Publish to live site

Each stage creates a pull request in your GitHub repo that merges when published.

### Direct Publishing (Alternative)

To enable instant publishing, edit `src/cms/config.yml`:

```yaml
# Change this line:
publish_mode: editorial_workflow

# To this:
publish_mode: simple
```

## Local Development

For local testing without deploying:

1. Uncomment local backend in `src/cms/config.yml`:
```yaml
local_backend: true
```

2. Run the CMS locally:
```bash
npx decap-server
```

3. In another terminal:
```bash
npm start
```

4. Visit `http://localhost:8080/admin/cms/`

## Configuration

### Update Repository

Edit `src/cms/config.yml`:

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO # Update this!
  branch: main
```

### Custom Collections

Add new content types by editing the `collections` section in `config.yml`.

## Troubleshooting

### "Unable to access"
- Ensure Git Gateway is enabled in Netlify
- Check that you're logged in to Netlify Identity
- Verify repository name in config.yml is correct

### Changes not appearing
- Check if using editorial workflow (creates PR)
- Merge the PR in GitHub
- Wait for Netlify to rebuild (usually 1-2 minutes)

### Local backend not working
- Ensure `npx decap-server` is running
- Check that `local_backend: true` is set in config

## Switching from GitHub Pages to Netlify

If you were using GitHub Pages:

1. Keep your GitHub repo as is
2. Deploy to Netlify (Netlify pulls from GitHub)
3. Update your domain DNS to point to Netlify
4. GitHub remains your source of truth

Both can coexist - GitHub hosts the code, Netlify serves the site and provides CMS.

## Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Git Gateway Documentation](https://docs.netlify.com/visitor-access/git-gateway/)

## Alternative: Keep Using GitHub Pages

If you prefer GitHub Pages over Netlify:

1. Use the **Local Content Manager** at `/admin/content/`
2. Edit files locally and push to GitHub
3. GitHub Pages will auto-rebuild

The Netlify CMS won't work on GitHub Pages without a backend server.
