const siteConfig = require('./site.config.json');

module.exports = function (eleventyConfig) {
    // Pass through assets
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/blog/assets");
    eleventyConfig.addPassthroughCopy("site.config.json");
    eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
    eleventyConfig.addPassthroughCopy("src/CNAME");

    // Make site config available globally
    eleventyConfig.addGlobalData("site", siteConfig);

    // Blog posts (exclude drafts)
    eleventyConfig.addCollection("posts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/blog/**/*.md")
            .filter(post => post.data.draft !== true)
            .sort((a, b) => b.date - a.date);
    });

    // Projects
    eleventyConfig.addCollection("projects", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/projects/**/*.md")
            .sort((a, b) => (b.data.order || 0) - (a.data.order || 0));
    });

    // Date filters
    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return new Date(dateObj).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
        });
    });

    eleventyConfig.addFilter("shortDate", (dateObj) => {
        return new Date(dateObj).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric"
        });
    });

    // Excerpt filter
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