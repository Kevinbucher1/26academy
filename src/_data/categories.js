// web/src/_data/categories.js
const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2025-07-29',
  useCdn: true,
});

module.exports = async function() {
  const categories = await client.fetch(`*[_type == "category"]`);
  return categories;
};