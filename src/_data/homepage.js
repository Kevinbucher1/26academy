require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2025-09-19', // Date du jour
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// On cible la page flexible qui a le slug "accueil"
const query = `*[_type == "pageFlexible" && slug.current == "accueil"][0]`;

module.exports = async function() {
  const data = await client.fetch(query);
  return data;
};