# Leniel Luzardo Portfolio

A modern, minimalist portfolio and blog site built with Eleventy and Nunjucks.

## Features

- ⚡ Fast static site generation with Eleventy
- 📱 Mobile-first, responsive design
- 🌓 Automatic light/dark theme based on system preferences
- 📝 Blog with article collections and categories
- 💼 Project portfolio showcase
- 🎨 Clean, minimalist black and white design
- ♿ Accessible and semantic HTML
- 🎛️ **Admin Dashboard** - Toggle features on/off without code changes
- 💌 Newsletter signup component
- 🔗 Blog post CTAs for business conversion
- 📄 Dedicated "Work with Me" page
- 🏷️ Blog categories and tags system

## Tech Stack

- [Eleventy](https://www.11ty.dev/) - Static site generator
- [Nunjucks](https://mozilla.github.io/nunjucks/) - Templating engine
- Vanilla CSS with CSS Variables
- Git submodules for external blog content

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lenielluzardo/lenielluzardo.git
cd lenielluzardo/www
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The site will be available at `http://localhost:8080`

## Development

- `npm start` - Start development server with live reload
- `npm run dev` - Same as start but with watch mode
- `npm run build` - Build for production
- `npm run clean` - Clean the output directory
- `npm run rebuild` - Clean and rebuild

## Project Structure

```
www/
├── src/
│   ├── _layouts/         # Nunjucks layouts
│   │   ├── base.njk      # Base HTML template
│   │   ├── header.njk    # Site header
│   │   ├── footer.njk    # Site footer
│   │   ├── article.njk   # Article/post layout
│   │   ├── blog-cta.njk  # Blog CTA component
│   │   └── newsletter.njk # Newsletter signup
│   ├── blog/             # Blog posts (markdown)
│   ├── projects/         # Project pages (markdown)
│   ├── index.njk         # Homepage
│   ├── blog.njk          # Blog listing page
│   ├── projects.njk      # Projects listing page
│   ├── work-with-me.njk  # Services page
│   ├── admin.njk         # Admin dashboard
│   ├── admin.js          # Admin functionality
│   └── style.css         # Global styles
├── public/               # Build output (generated)
├── site.config.json      # Feature flags & settings
├── eleventy.config.js    # Eleventy configuration
└── package.json
```

## Admin Dashboard

⚠️ **All admin sections require authentication via Netlify Identity**

After deploying to Netlify:
1. Enable Netlify Identity in your site settings
2. Enable Git Gateway under Identity settings
3. Invite yourself as a user with admin role
4. Log in at any admin page to access features

### Configuration Dashboard

Access at `/admin/` to manage site features:
- Toggle features on/off using switches
- Customize text content for CTAs and newsletter
- Download updated `site.config.json`
- Replace the file in your project root and rebuild

### Content Management

**Two Options Available:**

#### 1. Netlify CMS (Recommended for Production)
- **URL**: `/admin/cms/`
- **Best for**: Online editing with automatic commits to GitHub
- **Requirements**: Netlify deployment + GitHub OAuth
- **Features**: 
  - Full markdown editor
  - Image uploads
  - Draft/publish workflow
  - Direct GitHub commits
  - No manual file placement needed

📖 **[Complete Netlify CMS Setup Guide →](NETLIFY_CMS_SETUP.md)**

#### 2. Local Content Manager
- **URL**: `/admin/content/`
- **Best for**: Local development
- **Features**: 
  - Create and edit posts/projects
  - Download generated markdown files
  - Manual file placement required
  - Works offline

### Available Feature Toggles:

- **Blog CTA**: Show call-to-action at the end of blog posts
- **Newsletter Signup**: Email subscription form on blog pages
- **Blog Categories**: Tag/category system for posts
- **Recent Posts on Homepage**: Show latest articles
- **Recent Projects on Homepage**: Show latest work
- **Work with Me Page**: Enable dedicated services page in navigation

## Configuration

Edit `site.config.json` to customize:

```json
{
  "features": {
    "blogCTA": {
      "enabled": true,
      "title": "Need Help with Your Project?",
      "buttonText": "Work with Me"
    },
    "newsletter": {
      "enabled": true,
      "title": "Stay Updated"
    }
  }
}
```

## Adding Content

### Blog Posts

Create a new markdown file in `src/blog/`:

```markdown
---
title: Your Post Title
date: 2026-01-06
description: A brief description
tags: ["javascript", "web-dev"]
layout: article.njk
---

Your content here...
```

### Projects

Create a new markdown file in `src/projects/`:

```markdown
---
title: Project Name
description: Brief description
tech: ["JavaScript", "React", "Node.js"]
order: 1
layout: article.njk
---

Project details...
```

## Deployment

### Option 1: Netlify (Recommended - Includes CMS)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

1. Push to GitHub
2. Connect to Netlify
3. Deploy automatically
4. Enable Netlify Identity for CMS access

**See [NETLIFY_CMS_SETUP.md](NETLIFY_CMS_SETUP.md) for detailed CMS setup instructions.**

### Option 2: GitHub Pages

The site can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

Build command: `npm run build`
Output directory: `public`

## License

MIT

## Contact

Leniel Luzardo
- Email: lenielluzardo.dev@gmail.com
- LinkedIn: [linkedin.com/in/lenielluzardo](https://www.linkedin.com/in/lenielluzardo)
- GitHub: [github.com/lenielluzardo](https://github.com/lenielluzardo)
