// web/.eleventy.js
module.exports = function(eleventyConfig) {
  // Cette configuration dit à Eleventy de chercher les fichiers dans "src"
  // et de construire le site final dans "_site".
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};