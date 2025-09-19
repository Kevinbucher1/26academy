// web/src/_data/recrutement.js
const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2025-08-13', // Date du jour
  useCdn: true,
});

// On cherche la page flexible qui a pour titre interne "bloctel"
const query = `*[_type == "pageFlexible" && title == "Page bloctel"][0]`;

module.exports = async function() {
  const data = await client.fetch(query);
  return data;
};