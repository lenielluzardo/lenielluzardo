const siteConfig = require('./site.config.json');

module.exports = function (eleventyConfig) {
    // Pass through assets
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/blog/assets");
    eleventyConfig.addPassthroughCopy("site.config.json");
    eleventyConfig.addPassthroughCopy("src/admin.js");
    eleventyConfig.addPassthroughCopy("src/content-admin.js");
    eleventyConfig.addPassthroughCopy({ "src/cms": "admin/cms" });

    // Make site config available globally
    eleventyConfig.addGlobalData("site", siteConfig);

    // Collections for blog posts
    eleventyConfig.addCollection("posts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/blog/**/*.md")
            .filter(post => {
                // Filter out drafts in production
                const isDraft = post.data.draft === true;
                const isHidden = siteConfig.content.drafts.includes(post.fileSlug);
                return !isDraft && !isHidden;
            })
            .sort((a, b) => {
                return b.date - a.date; // Sort by date descending
            });
    });

    // Collection for all posts including drafts (for admin)
    eleventyConfig.addCollection("allPosts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/blog/**/*.md").sort((a, b) => {
            return b.date - a.date;
        });
    });

    // Collection for projects/portfolio
    eleventyConfig.addCollection("projects", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/projects/**/*.md")
            .filter(project => {
                // Filter out hidden projects
                const isHidden = siteConfig.content.hiddenProjects.includes(project.fileSlug);
                return !isHidden;
            })
            .sort((a, b) => {
                return (b.data.order || 0) - (a.data.order || 0);
            });
    });

    // Collection for all projects including hidden (for admin)
    eleventyConfig.addCollection("allProjects", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/projects/**/*.md").sort((a, b) => {
            return (b.data.order || 0) - (a.data.order || 0);
        });
    });

    // Collection: Posts by category/tag
    eleventyConfig.addCollection("postsByTag", function(collectionApi) {
        const postsByTag = {};
        collectionApi.getFilteredByGlob("src/blog/**/*.md").forEach(post => {
            if (post.data.tags) {
                post.data.tags.forEach(tag => {
                    if (tag !== "posts") {
                        if (!postsByTag[tag]) {
                            postsByTag[tag] = [];
                        }
                        postsByTag[tag].push(post);
                    }
                });
            }
        });
        return postsByTag;
    });

    // Get all unique tags
    eleventyConfig.addCollection("allTags", function(collectionApi) {
        const tags = new Set();
        collectionApi.getFilteredByGlob("src/blog/**/*.md").forEach(post => {
            if (post.data.tags) {
                post.data.tags.forEach(tag => {
                    if (tag !== "posts") {
                        tags.add(tag);
                    }
                });
            }
        });
        return Array.from(tags).sort();
    });

    // Date filter
    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return new Date(dateObj).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    });

    // Short date filter
    eleventyConfig.addFilter("shortDate", (dateObj) => {
        return new Date(dateObj).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    });

    // Excerpt filter (first paragraph or 200 chars)
    eleventyConfig.addFilter("excerpt", (content) => {
        if (!content) return "";
        const excerpt = content.trim().split("\n")[0] || content.substring(0, 200);
        return excerpt.length < content.length ? excerpt + "..." : excerpt;
    });

    // Limit filter
    eleventyConfig.addFilter("limit", (array, limit) => {
        return array.slice(0, limit);
    });

    return {
        dir: {
            input: "src",
            output: "public",
            layouts: "_layouts"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        templateFormats: ["md", "njk", "html"],
        ignores: ["src/_templates/**"]
    };
}