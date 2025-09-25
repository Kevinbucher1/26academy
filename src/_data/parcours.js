// src/_data/parcours.js
require('dotenv').config(); // Ceci lit votre fichier .env
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '29lzrddu',
  dataset: 'production',
  apiVersion: '2024-09-08',
  useCdn: false, // On met 'false' pour le développement pour voir les changements en direct
  token: process.env.SANITY_API_TOKEN, // On utilise la clé d'accès que vous venez d'ajouter
});

const query = `*[_type == "parcours" && defined(slug.current) && !(_id in path("drafts.**"))]{
  ...,
  category->{
    title
  },
  certification->{
    title
  },
  partenaire->{
    title
  },
  "financementsPossibles": financements[]->title, // Récupère une liste de titres
  testimonials[]->{
    nom,
    poste,
    avis,
    photo
  }
}`;


module.exports = async function() {
  const data = await client.fetch(query);
  console.log(`[Sanity] Données récupérées : ${data.length} parcours.`); // Pour vérifier que ça fonctionne !
  return data;
};