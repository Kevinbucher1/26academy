// Fichier : web/.eleventy.js

module.exports = function(eleventyConfig) {

  // Cette ligne copie le dossier des assets (CSS, images...) dans le site final
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    // On définit explicitement les formats de templates qu'Eleventy doit reconnaître
    templateFormats: ["njk", "md", "html"],

    // On définit la structure des dossiers
    dir: {
      input: "src",
      output: "_site"
    }
  };
};