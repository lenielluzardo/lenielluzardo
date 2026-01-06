# Blog Content Workflow

This document explains how blog content is managed using a separate Git repository as a submodule.

## Architecture

### Repository Structure

- **Main Repository**: `lenielluzardo/lenielluzardo`
  - Contains the site code, layouts, and configuration
  - Located at: `d:\d\p\dev\lenielluzardo\`

- **Blog Repository**: `lenielluzardo/ll.db.blog` (Git Submodule)
  - Contains all blog post markdown files
  - Mounted at: `www/src/blog/`
  - Independent Git history

### Why This Setup?

1. **Separation of Concerns**: Content is separate from code
2. **Independent History**: Blog changes don't clutter main repo history
3. **Flexible Permissions**: Can grant content-only access without code access
4. **Easy Backup**: Blog content can be cloned/backed up independently

## Working with Blog Content

### Option 1: Netlify CMS (Recommended)

Access the CMS at: `https://wwwlenielluzardo.netlify.app/admin/cms/`

**Features:**
- Visual markdown editor
- Draft/publish workflow
- Image uploads
- GitHub authentication
- Automatic commits to both repositories

**How it works:**
1. Log in with your GitHub account via Netlify Identity
2. Create/edit blog posts in the "Blog Posts" section
3. CMS commits changes directly to the `ll.db.blog` repository
4. Main repository automatically updates submodule reference
5. Netlify rebuilds and deploys the site

### Option 2: Local Development

#### Initial Setup

```bash
# Clone main repository
git clone https://github.com/lenielluzardo/lenielluzardo.git
cd lenielluzardo

# Initialize and update submodules
git submodule update --init --recursive

# The blog folder is now at www/src/blog/
```

#### Creating a New Blog Post

1. Navigate to the blog submodule:
```bash
cd www/src/blog
```

2. Create a new markdown file with date prefix:
```bash
# Format: YYYY-MM-DD-slug.md
touch 2026-01-15-my-new-post.md
```

3. Add frontmatter and content:
```markdown
---
title: "My Awesome Blog Post"
date: 2026-01-15
description: "A brief description for SEO and previews"
tags: ["javascript", "tutorial"]
layout: article.njk
draft: false
---

## Your content here

Write your blog post content using markdown...
```

4. Commit and push to blog repository:
```bash
git add .
git commit -m "feat: add new blog post about XYZ"
git push origin main
```

5. Update main repository to reference new submodule commit:
```bash
cd ../../..  # Back to main repo root
git add www/src/blog
git commit -m "chore: update blog submodule"
git push origin main
```

6. Deploy:
```bash
cd www
npm run build
netlify deploy --prod
```

#### Editing Existing Posts

```bash
# Navigate to blog submodule
cd www/src/blog

# Edit the post
code 2026-01-15-my-new-post.md

# Commit changes
git add .
git commit -m "fix: update post content"
git push origin main

# Update main repo
cd ../../..
git add www/src/blog
git commit -m "chore: update blog submodule"
git push origin main
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

## Submodule Management

### Updating Blog Submodule

To pull latest blog posts from the remote repository:

```bash
cd www/src/blog
git pull origin main
cd ../../..
git add www/src/blog
git commit -m "chore: update blog submodule to latest"
git push origin main
```

### Check Submodule Status

```bash
# From main repository root
git submodule status

# Shows commit hash and path
# - prefix means submodule not initialized
# + prefix means different commit than expected
```

### Reset Submodule

If your submodule gets into a weird state:

```bash
git submodule deinit -f www/src/blog
git submodule update --init --recursive
```

## Netlify Configuration

The `netlify.toml` includes:

```toml
[build.processing]
  git_submodules = true
```

This ensures Netlify:
1. Clones the main repository
2. Initializes and updates submodules
3. Builds with all blog content available

## Troubleshooting

### Blog posts not showing up

1. Check submodule is initialized: `git submodule status`
2. Verify frontmatter is valid YAML
3. Check `draft: false` in frontmatter
4. Rebuild: `npm run build`

### Submodule shows modified but no changes

```bash
cd www/src/blog
git status
git reset --hard origin/main
```

### CMS changes not reflecting

1. Check Netlify Identity is enabled
2. Verify Git Gateway is configured
3. Check build logs: https://app.netlify.com/projects/wwwlenielluzardo/deploys
4. Ensure submodule reference is updated in main repo

### Local and remote out of sync

```bash
# Force sync with remote
cd www/src/blog
git fetch origin
git reset --hard origin/main
cd ../../..
git add www/src/blog
git commit -m "chore: sync blog submodule"
```

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  Content Creation                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Netlify CMS ──────┬────────> ll.db.blog Repository    │
│                    │                                     │
│  Local Editor ─────┘                                     │
│                                                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│            Main Repository Update                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Submodule reference updated                            │
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
│  2. Initialize submodules (fetch blog content)          │
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
3. **Test Locally**: Build locally before pushing
4. **Review Drafts**: Use `draft: true` for work in progress
5. **Tag Consistently**: Use lowercase, hyphenated tags
6. **Backup**: The blog repo is your content backup

## Quick Reference

```bash
# Pull latest blog content
git submodule update --remote www/src/blog

# Create new post
cd www/src/blog
touch $(date +%Y-%m-%d)-my-post.md

# Push blog changes
cd www/src/blog
git add . && git commit -m "feat: new post" && git push

# Update main repo
cd ../../.. && git add www/src/blog
git commit -m "chore: update blog" && git push

# Build and deploy
cd www && npm run build && netlify deploy --prod
```

## Support

- **Build Issues**: Check Netlify dashboard logs
- **Content Issues**: Verify frontmatter and markdown syntax
- **Submodule Issues**: See troubleshooting section above
- **CMS Access**: Ensure Netlify Identity is configured
