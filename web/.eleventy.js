// web/.eleventy.js
module.exports = function(eleventyConfig) {

  // Cette ligne dit à Eleventy de copier le dossier css dans le site final
  eleventyConfig.addPassthroughCopy("src/assets/css");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};