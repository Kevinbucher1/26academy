// /studio/schemas/formation.js

export default {
  // `name` est l'identifiant unique dans le code
  name: 'formation',
  // `title` est le nom qui s'affiche dans le Sanity Studio
  title: 'Formation',
  // `type` définit que c'est un document à part entière
  type: 'document',
  // `fields` est le tableau qui contient tous les champs de ce document
  fields: [
    {
      name: 'title',
      title: 'Nom de la formation',
      type: 'string',
      // La validation garantit qu'un titre est toujours fourni
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      // Génère automatiquement le slug à partir du champ 'title'
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Catégorie',
      // `reference` crée un lien vers un autre type de document
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'is_cpf_eligible',
      title: 'Éligible CPF',
      type: 'boolean',
      // Valeur par défaut quand on crée une nouvelle formation
      initialValue: false,
    },
    {
      name: 'hero_logo',
      title: 'Logo de la section principale',
      type: 'image',
      options: {
        hotspot: true, // Permet de mieux contrôler le recadrage de l'image
      },
    },
    {
      name: 'presentation',
      title: 'Présentation',
      type: 'object',
      fields: [
        { name: 'certification_title', title: 'Titre de la certification', type: 'string' },
        { name: 'certification_code', title: 'Code de la certification', type: 'string' },
        { name: 'description', title: 'Description principale', type: 'text' },
        {
          name: 'key_points',
          title: 'Points Clés',
          type: 'array',
          // `of` définit les types d'éléments autorisés dans le tableau
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Titre', type: 'string' },
              { name: 'subtitle', title: 'Sous-titre', type: 'string' },
            ],
          }],
        },
      ],
    },
    {
      name: 'learning_info',
      title: 'Informations Pédagogiques',
      type: 'object',
      fields: [
        { name: 'objectives', title: 'Objectifs', type: 'array', of: [{ type: 'string' }] },
        { name: 'prerequisites', title: 'Pré-requis', type: 'text' },
        { name: 'target_audience', title: 'Public visé', type: 'text' },
      ],
    },
    {
      name: 'program_modules',
      title: 'Modules du Programme',
      type: 'array',
      of: [{
        name: 'module',
        title: 'Module',
        type: 'object',
        fields: [
          { name: 'title', title: 'Titre du module', type: 'string' },
          { name: 'image', title: 'Image', type: 'image' },
          { name: 'duration', title: 'Durée', type: 'string' },
          // Portable Text pour du contenu riche (gras, listes, etc.)
          { name: 'details', title: 'Détails du module', type: 'array', of: [{ type: 'block' }] },
        ],
      }],
    },
    {
      name: 'metrics',
      title: 'Indicateurs',
      type: 'object',
      fields: [
        { name: 'certification_details', title: 'Détails de la certification', type: 'text' },
        { name: 'rating', title: 'Note (sur 5)', type: 'number', validation: Rule => Rule.min(0).max(5) },
        { name: 'success_rate', title: 'Taux de réussite (%)', type: 'number', validation: Rule => Rule.min(0).max(100) },
        { name: 'learner_count', title: 'Nombre d\'apprenants', type: 'number' },
      ],
    },
    // Intégration du schéma SEO réutilisable
    {
      name: 'seo',
      title: 'Optimisation SEO',
      type: 'seo',
      options: {
        collapsible: true, // Permet de replier la section dans l'interface
        collapsed: false,
      },
    },
  ],
};