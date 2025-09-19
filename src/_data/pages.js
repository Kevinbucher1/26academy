require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2025-09-17', // Date du jour
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// On récupère toutes les pages de type "pageFlexible" qui sont publiées
const query = `*[_type == "pageFlexible" && defined(slug.current) && !(_id in path("drafts.**"))]`;

module.exports = async function() {
  const data = await client.fetch(query);
  return data;
};