require('dotenv').config();

const { toHTML } = require('@portabletext/to-html');
const imageUrlBuilder = require('@sanity/image-url');
const { createClient } = require('@sanity/client');

// On configure un client Sanity pour pouvoir traiter les images
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2025-07-29', // Date du jour
  useCdn: true,
});

const builder = imageUrlBuilder(client);

module.exports = function(eleventyConfig) {
  
  // 1. Copie des assets (votre code)
  eleventyConfig.addPassthroughCopy("src/assets");

eleventyConfig.addFilter("log", (value) => {
    console.log("--- DEBUG ---");
    console.log(value);
    console.log("--- FIN DEBUG ---");
    return value; // On retourne la valeur pour ne pas casser la suite
  });

  // 2. Filtre pour convertir le "Portable Text" de Sanity en HTML
  eleventyConfig.addFilter("portableText", (value) => {
    return value ? toHTML(value) : '';
  });

  // 3. Filtre pour générer des URL d'images optimisées depuis Sanity
  eleventyConfig.addFilter("sanityImageUrl", (ref) => {
    if (!ref) {
      return ''; // Retourne une chaîne vide si l'image n'existe pas
    }
    return builder.image(ref).auto('format').url();
  });

    // ▼▼▼ 3. AJOUT DU FILTRE "MAP" MANQUANT ▼▼▼
  eleventyConfig.addNunjucksFilter("map", function(collection, key) {
    if (!Array.isArray(collection)) {
      return [];
    }
    return collection.map((item) => item[key]);
  });
  // ▲▲▲ FIN DE L'AJOUT ▲▲▲

  // 4. Configuration des dossiers et formats (votre code)
  return {
    templateFormats: ["md", "njk", "html"],
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};