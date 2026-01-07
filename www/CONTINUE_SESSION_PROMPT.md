# Context Prompt for Continuing Work on Leniel Luzardo Portfolio CMS

Use this prompt to restore context when continuing work on this project.

---

## PROJECT CONTEXT

I'm working on a **Professional CMS Portfolio System** built with Eleventy, hosted on Netlify. The project is located at `d:\d\p\dev\lenielluzardo\` and is fully functional and deployed.

## CURRENT STATE (as of January 6, 2026)

### ✅ What's Working
- Complete Eleventy 3.1.2 static site generator setup
- Comprehensive CSS design system (1000+ lines) with dark mode
- All core pages: Home, Blog, Projects, Work with Me
- Admin dashboard for feature management (authentication protected)
- Content management system for CRUD operations (authentication protected)
- Netlify CMS (Decap CMS) integration at `/admin/cms/`
- Dual blog folder system (blog submodule + blog_main for CMS)
- GitHub Actions workflows for automated blog deployment
- Netlify Identity authentication protecting admin routes
- Responsive design with proper text overflow handling
- Site deployed at: https://wwwlenielluzardo.netlify.app

### 📂 Key Files & Structure
```
www/
├── eleventy.config.js (collections from blog/ and blog_main/)
├── site.config.json (feature flags)
├── netlify.toml (build config, git_submodules=true)
├── src/
│   ├── style.css (complete design system)
│   ├── admin.njk + admin.js (feature toggles)
│   ├── content-admin.njk + content-admin.js (content CRUD)
│   ├── blog.njk, projects.njk, work-with-me.njk, index.njk
│   ├── _layouts/ (base, header, footer, article, components)
│   ├── blog/ (GIT SUBMODULE from ll.db.blog repo)
│   ├── blog_main/ (CMS-editable posts in main repo)
│   └── cms/ (Netlify CMS config)
└── .github/workflows/update-blog-submodule.yml
```

### 🔑 Important Architecture Decisions

1. **Dual Blog System**: 
   - `src/blog/` is a git submodule from separate `ll.db.blog` repository
   - `src/blog_main/` is in main repo for Netlify CMS editing
   - Eleventy reads from BOTH folders
   - Why: Git submodules don't work with Netlify CMS git-gateway backend

2. **Authentication**:
   - All admin pages protected by Netlify Identity
   - Routes: `/admin/`, `/admin/content/`, `/admin/cms/`
   - Identity widget loaded in base.njk

3. **Automated Deployment**:
   - Workflow in main repo: `.github/workflows/update-blog-submodule.yml`
   - Workflow in blog repo: `www/src/blog/.github/workflows/notify-main-repo.yml`
   - When blog post added to ll.db.blog → triggers main repo → updates submodule → Netlify rebuilds
   - Requires DISPATCH_TOKEN secret in blog repository

4. **Feature Flags**:
   - All features controlled via `site.config.json`
   - Toggle-able through admin dashboard
   - Includes: blogCTA, newsletter, recentPosts, recentProjects, workWithMePage, blogCategories

### 📝 Recent Work

**Latest Article Created**:
- `2026-01-06-building-professional-cms-with-ai-assistance.md`
- Chronicles building this system with AI assistance
- Includes 30 enhancement ideas organized by category
- Implementation priority guide

**Latest Documentation**:
- `AI_AGENT_REPLICATION_PROMPT.md` - Complete prompt to rebuild system from scratch (16 phases)
- `AUTOMATED_BLOG_DEPLOYMENT.md` - GitHub Actions workflow setup guide

**Latest CSS Fixes**:
- Added proper text overflow handling to all cards
- `word-wrap: break-word`, `overflow-wrap: break-word`, `word-break: break-word`
- Applied to: `.card`, `.benefit-card`, `.service-item`, `.faq-item`

### 🚀 Deployment Info

**Repositories**:
- Main: `github.com/lenielluzardo/lenielluzardo`
- Blog: `github.com/lenielluzardo/ll.db.blog` (submodule)

**Netlify**:
- Site: https://wwwlenielluzardo.netlify.app
- Build command: `npm run build`
- Publish directory: `www/public`
- Git submodules: enabled
- Identity: enabled with Git Gateway

**GitHub Actions**:
- Both workflows committed and pushed
- Need to configure DISPATCH_TOKEN secret if not done yet

### 🛠️ Development Commands

```bash
# Navigate to project
cd d:\d\p\dev\lenielluzardo\www

# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm start

# Build for production
npm run build

# Git workflow
git add .
git commit -m "message"
git push origin main
```

### 🎯 Enhancement Roadmap (from article)

**High Priority**:
1. Search functionality
2. Code syntax highlighting
3. RSS feed
4. Table of contents
5. Image optimization

**Medium Priority**:
6. Related posts
7. Comments system
8. Newsletter integration (actual email service)
9. Analytics
10. Advanced SEO enhancements

**Low Priority**:
11. Theme customizer
12. Multi-language support
13. PWA features
14. Scheduled publishing
15. Testing suite

### ⚠️ Known Considerations

1. **Submodule Management**: Remember to update submodule reference when blog repo changes (or use automated workflow)
2. **CMS Limitations**: Netlify CMS can only edit `blog_main/` folder, not submodule
3. **Token Expiration**: GitHub Personal Access Token (DISPATCH_TOKEN) may need renewal
4. **CSS Specificity**: Design system uses CSS variables extensively - modify in `:root` and dark mode section

### 📚 Contact Information (from site.config.json)
- Email: lenielluzardo.dev@gmail.com
- LinkedIn: linkedin.com/in/lenielluzardo
- GitHub: github.com/lenielluzardo

---

## PROMPT TO USE TOMORROW

**Copy everything below this line when starting a new session:**

---

Hi! I'm continuing work on my Professional CMS Portfolio built with Eleventy. 

**Project Location**: `d:\d\p\dev\lenielluzardo\`

**Current State**: Fully functional and deployed at https://wwwlenielluzardo.netlify.app

**What's Working**:
- Complete Eleventy site with blog, projects, work-with-me pages
- Admin dashboard with feature toggles (auth protected)
- Netlify CMS at /admin/cms/
- Dual blog system (submodule + main repo folder)
- GitHub Actions automated deployment
- Responsive design with dark mode

**Key Architecture**:
- `src/blog/` = git submodule from ll.db.blog repo (read-only for CMS)
- `src/blog_main/` = main repo folder (CMS-editable)
- Eleventy reads from BOTH folders
- All admin routes protected by Netlify Identity
- Feature flags in `site.config.json`

**Recent Work**:
- Created AI replication prompt (AI_AGENT_REPLICATION_PROMPT.md)
- Published article about building with AI assistance
- Fixed text overflow issues in all cards
- Implemented automated blog deployment workflows

**Reference Docs in Repo**:
- AI_AGENT_REPLICATION_PROMPT.md (complete system documentation)
- AUTOMATED_BLOG_DEPLOYMENT.md (workflow setup guide)
- 2026-01-06 article (enhancement roadmap with 30 ideas)

[If continuing specific work, add here what you want to work on next]

---

