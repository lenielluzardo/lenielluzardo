# Content Templates

This directory contains templates for creating consistent, high-quality content for your portfolio site.

## Available Templates

### Blog Post Template
**File**: `blog-post-template.md`

Use this template when creating new blog articles. It includes:
- Proper frontmatter structure with title, date, description, and tags
- Organized sections for introduction, main content, and conclusion
- Best practices for code examples and formatting
- Guidance on structure and flow

**How to use**:
1. Copy `blog-post-template.md` to the `/src/blog/` directory
2. Rename it to your article slug (e.g., `my-new-article.md`)
3. Fill in the frontmatter and replace placeholder content
4. Build and publish

### Project Template
**File**: `project-template.md`

Use this template for portfolio projects. It includes:
- Project metadata (title, tech stack, timeline)
- Sections for overview, challenges, solutions, and results
- Structure for showcasing technical decisions
- Areas for metrics and impact

**How to use**:
1. Copy `project-template.md` to the `/src/projects/` directory
2. Rename it to your project slug (e.g., `my-project.md`)
3. Fill in all sections with your project details
4. Add screenshots or demos
5. Build and publish

## Frontmatter Fields

### Blog Posts

```yaml
---
title: "Your Post Title"              # Required: The article title
date: YYYY-MM-DD                      # Required: Publication date
description: "Brief description"      # Required: For SEO and previews
tags: ["tag1", "tag2"]               # Required: For categorization
layout: article.njk                   # Required: Use article layout
---
```

### Projects

```yaml
---
title: "Project Name"                 # Required: Project name
description: "Brief description"      # Required: One-line summary
tech: ["Tech1", "Tech2"]             # Required: Technologies used
order: 1                              # Required: Display order (higher = first)
layout: article.njk                   # Required: Use article layout
date: YYYY-MM-DD                      # Optional: Project completion date
link: "https://url.com"               # Optional: Live project URL
github: "https://github.com/..."      # Optional: Source code link
image: "/assets/projects/image.jpg"   # Optional: Project thumbnail
---
```

## Writing Tips

### Blog Posts
- Start with a compelling introduction
- Use code examples sparingly and keep them focused
- Break content into scannable sections with clear headings
- Include practical takeaways readers can apply
- End with a clear conclusion and next steps

### Projects
- Lead with the problem and your solution
- Showcase your decision-making process
- Include concrete metrics and results
- Highlight interesting technical challenges
- Demonstrate impact and value delivered

## Content Guidelines

### General
- Write in clear, concise language
- Use active voice
- Keep paragraphs short (2-4 sentences)
- Use headings to improve scannability
- Include images and examples where helpful

### Technical Content
- Explain complex concepts simply
- Provide context before code examples
- Comment your code snippets
- Link to relevant documentation
- Anticipate and answer reader questions

### SEO Best Practices
- Write descriptive, keyword-rich titles
- Keep descriptions between 120-160 characters
- Use relevant tags/categories
- Include internal links to related content
- Make content valuable and unique

## Need Help?

If you're unsure how to structure a piece of content, refer back to these templates and adapt them to your needs. Consistency helps readers navigate your site and positions you as a professional.
