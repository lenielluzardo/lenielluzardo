module.exports = function (eleventyConfig)
{
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/blog/assets");

    return {
        dir: {
            input: "src",
            output: "public",
            layouts: "_layouts"
        }
    };
}