# Blog Content Workflow

This document explains how blog content is managed and automatically synced between repositories.

## Architecture

### Repository Structure

- **Main Repository**: `lenielluzardo/lenielluzardo`
  - Contains the site code, layouts, configuration, and blog content
  - Blog posts stored at: `www/src/blog/`
  - Located at: `d:\p\dev\lenielluzardo\`

- **Blog Repository**: `lenielluzardo/ll.db.blog` (Synced Copy)
  - Mirror of blog content for backup/portability
  - Automatically synced via GitHub Actions when main repo is updated
  - Independent Git history

### Why This Setup?

1. **Simplicity**: All content in main repository, easy to edit
2. **Automatic Sync**: Blog posts automatically copied to ll.db.blog for backup
3. **CMS Integration**: Netlify CMS works directly with main repo (no submodule issues)
4. **Backup**: Blog content mirrored in separate repository
5. **No Submodule Complexity**: Simpler deployment and development workflow

## How It Works

When you create or edit a blog post in the main repository:
1. Changes are committed to `www/src/blog/` in the main repo
2. GitHub Actions detects the change
3. The workflow automatically copies the new/updated post to `ll.db.blog`
4. Both repositories stay in sync automatically

## Working with Blog Content

### Option 1: Netlify CMS (Recommended)

Access the CMS at: `https://wwwlenielluzardo.netlify.app/admin/cms/`

**Features:**
- Visual markdown editor
- Draft/publish workflow
- Image uploads
- GitHub authentication
- Automatic commit, deploy, and sync to ll.db.blog

**How it works:**
1. Log in with your GitHub account via Netlify Identity
2. Create/edit blog posts in the "Blog Posts" section
3. CMS commits changes to `www/src/blog/` in the main repository
4. GitHub Actions automatically syncs the post to ll.db.blog
5. Netlify rebuilds and deploys the site

### Option 2: Local Development

#### Initial Setup

```bash
# Clone main repository
git clone https://github.com/lenielluzardo/lenielluzardo.git
cd lenielluzardo/www

# Install dependencies
npm install

# Start development server
npm start
```

#### Creating a New Blog Post

1. Navigate to the blog folder:
```bash
cd www/src/blog
```

2. Create a new markdown file with date prefix:
```bash
# Format: YYYY-MM-DD-slug.md
touch 2026-01-29-my-new-post.md
```

3. Add frontmatter and content:
```markdown
---
title: "My Awesome Blog Post"
date: 2026-01-29
description: "A brief description for SEO and previews"
tags: ["javascript", "tutorial"]
layout: article.njk
draft: false
---

## Your content here

Write your blog post content using markdown...
```

4. Commit and push to main repository:
```bash
cd ../../..  # Back to repo root
git add www/src/blog/2026-01-29-my-new-post.md
git commit -m "feat: add new blog post about XYZ"
git push origin main
```

5. GitHub Actions automatically syncs to ll.db.blog and Netlify deploys!

#### Editing Existing Posts

```bash
# Navigate to blog folder
cd www/src/blog

# Edit the post
code 2026-01-29-my-new-post.md

# Commit changes
git add .
git commit -m "fix: update post content"
git push origin main

# Automatic sync and deploy happens!
```

## Blog Post Template

Use the template at `www/src/_templates/blog-post-template.md` as a starting point.

### Required Frontmatter

```yaml
---
title: "Post Title"           # Required
date: YYYY-MM-DD              # Required
description: "Brief desc"      # Required (for SEO)
tags: ["tag1", "tag2"]        # Optional
layout: article.njk            # Required
draft: false                   # Optional (default: false)
---
```

### Content Guidelines

1. **Structure**: Use clear headings (##, ###) to organize content
2. **Introduction**: Start with a hook and outline what readers will learn
3. **Code Examples**: Use fenced code blocks with language identifiers
4. **Images**: Place in `www/src/assets/` and reference with relative paths
5. **Links**: Use relative paths for internal links, full URLs for external
6. **Conclusion**: Summarize key takeaways

## GitHub Actions Automation

The repository includes a GitHub Action (`.github/workflows/sync-to-blog-repo.yml`) that:

1. **Triggers** when markdown files in `www/src/blog/` are pushed to main branch
2. **Detects** which blog posts were added or modified
3. **Syncs** those posts to the ll.db.blog repository
4. **Commits** the changes automatically

### Required Setup

You need a Personal Access Token (PAT) with repo permissions:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Add it as a secret named `BLOG_SYNC_TOKEN` in your main repository settings
4. The workflow will use this token to push to ll.db.blog

## Netlify Configuration

The `netlify.toml` is simplified - no submodule configuration needed:

```toml
[build]
  command = "npm run build"
  publish = "public"
```

Netlify simply:
1. Clones the main repository
2. Installs dependencies
3. Builds with Eleventy
4. Deploys the site

## Troubleshooting

### Blog posts not showing up

1. Verify frontmatter is valid YAML
2. Check `draft: false` in frontmatter
3. Rebuild locally: `npm run build`
4. Check Eleventy config references `blog`

### Sync to ll.db.blog not working

1. Check GitHub Actions tab for workflow errors
2. Verify `BLOG_SYNC_TOKEN` secret is set correctly
3. Ensure token has `repo` scope permissions
4. Check workflow logs for specific error messages

### CMS changes not reflecting

1. Check Netlify Identity is enabled
2. Verify Git Gateway is configured
3. Check build logs: https://app.netlify.com/projects/wwwlenielluzardo/deploys
4. Ensure CMS is pointing to `www/src/blog/` folder

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  Content Creation                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Netlify CMS ──────┬────────> Main Repository          │
│                    │          (www/src/blog/)            │
│  Local Editor ─────┘                                     │
│                                                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│            GitHub Actions Trigger                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Detects changes in blog/*.md                           │
│  → Syncs files to ll.db.blog repository                │
│  → Triggers Netlify build                               │
│                                                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Netlify Build Process                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Clone main repo                                     │
│  2. Install dependencies                                │
│  3. Run npm run build (Eleventy)                        │
│  4. Deploy to CDN                                       │
│                                                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
                  Live Site
```

## Best Practices

1. **Commit Often**: Make small, focused commits
2. **Descriptive Messages**: Use conventional commit format
3. **Test Locally**: Build locally before pushing (`npm run build`)
4. **Review Drafts**: Use `draft: true` for work in progress
5. **Tag Consistently**: Use lowercase, hyphenated tags
6. **Automatic Backup**: ll.db.blog serves as automatic backup

## Quick Reference

```bash
# Create new post
cd www/src/blog
touch $(date +%Y-%m-%d)-my-post.md
# Edit the file...

# Commit and push (triggers automatic sync)
git add .
git commit -m "feat: new post about XYZ"
git push origin main

# Build and test locally
cd ..
npm run build
npm start

# Check GitHub Actions
# Visit: https://github.com/lenielluzardo/lenielluzardo/actions
```

## Support

- **Build Issues**: Check Netlify dashboard logs
- **Content Issues**: Verify frontmatter and markdown syntax
- **Sync Issues**: Check GitHub Actions workflow logs
- **CMS Access**: Ensure Netlify Identity is configured
- **Token Issues**: Verify BLOG_SYNC_TOKEN secret has repo permissions
