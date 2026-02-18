# lenielluzardo.dev

Personal portfolio and blog built with [Eleventy](https://www.11ty.dev/) and [Decap CMS](https://decapcms.org/), deployed to [GitHub Pages](https://pages.github.com/).

## Development

```bash
cd www
npm install
npm start          # Local dev server at http://localhost:8080
npm run dev:cms    # Dev server + local Decap CMS at /admin
```

## Deployment

Pushes to `main` (under `www/`) trigger a GitHub Actions build that deploys to GitHub Pages.

## Structure

```
.github/workflows/    GitHub Actions deploy workflow
www/
  src/                Source files (Nunjucks, Markdown, CSS)
  site.config.json    Page toggle settings
  eleventy.config.js  Eleventy configuration
```
