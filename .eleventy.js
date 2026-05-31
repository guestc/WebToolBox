module.exports = function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    port: 8080,
    host: '0.0.0.0'
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/_headers");

  eleventyConfig.addCollection("allTools", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/tools/**/*.md").filter(item => {
      return item.inputPath.endsWith("index.md") === false;
    });
  });

  eleventyConfig.addCollection("toolsByCategory", function(collectionApi) {
    const tools = collectionApi.getFilteredByGlob("src/tools/**/*.md").filter(item => {
      return item.inputPath.endsWith("index.md") === false;
    });
    const grouped = {};
    tools.forEach(tool => {
      const cat = tool.data.category;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(tool);
    });
    return grouped;
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["md", "njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
