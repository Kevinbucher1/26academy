// web/src/_data/formations.js
const { createClient } = require('@sanity/client');

// Le client utilise les variables d'environnement pour se connecter
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-07-28', // Utilisez la date du jour
  useCdn: true,
});

// La requête pour récupérer toutes les formations
const query = `*[_type == "formation"]{
  ...,
  "category": category->title
}`;

module.exports = async function() {
  const formations = await client.fetch(query);
  return formations;
};