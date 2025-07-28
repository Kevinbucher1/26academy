module.exports = function(eleventyConfig) {
  // Copie les assets (CSS, images) vers le site final
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    // Les formats de fichiers qu'Eleventy doit traiter comme des templates
    templateFormats: ["md", "njk", "html"],
    
    // La structure des dossiers
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};