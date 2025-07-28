// web/src/_data/homepage.js
const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2025-07-28',
  useCdn: true,
});

// On cherche la page flexible qui a pour titre interne "Page d'Accueil"
const query = `*[_type == "pageFlexible" && title == "Page d'Accueil"][0]`;

module.exports = async function() {
  const data = await client.fetch(query);
  return data;
};