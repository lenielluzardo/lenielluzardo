module.exports = function (eleventyConfig)
{
    // eleventyConfig.addPassthroughCopy("./path/to/dir");

    return {
        dir: {
            input: "src",
            output: "public",
            layouts: "_layouts"
        }
    };
}