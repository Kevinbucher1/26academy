// /studio/schemas/seo.js

export default {
  // `name` est l'identifiant qui sera utilisé dans d'autres schémas
  name: 'seo',
  title: 'Paramètres SEO',
  // `type: 'object'` car ce n'est pas une page mais un groupe de champs réutilisables
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Titre pour le SEO',
      type: 'string',
      description: 'Le titre qui apparaîtra dans les moteurs de recherche (max. 60 caractères).',
      validation: Rule => Rule.max(60).warning('Un titre plus court est généralement meilleur.'),
    },
    {
      name: 'metaDescription',
      title: 'Description pour le SEO',
      type: 'text',
      rows: 3,
      description: 'La description qui apparaîtra sous le titre dans Google (max. 160 caractères).',
      validation: Rule => Rule.max(160).warning('Une description plus concise est souvent plus efficace.'),
    },
    {
      name: 'openGraphImage',
      title: 'Image pour le partage sur les réseaux sociaux',
      type: 'image',
      description: 'Format recommandé : 1200x630 pixels.',
    },
  ],
};