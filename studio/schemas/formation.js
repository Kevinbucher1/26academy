// studio/schemas/formation.js
export default {
  name: 'formation',
  title: 'Formation',
  type: 'document',
  fields: [
    // --- Infos générales ---
    { name: 'title', title: 'Titre de la formation', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'URL (Slug)', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() },
    { name: 'category', title: 'Catégorie', type: 'reference', to: [{type: 'category'}], validation: Rule => Rule.required() },

    // --- Section Principale (Hero) ---
    {
      name: 'hero_section', title: 'Section Principale (Hero)', type: 'object',
      fields: [
        { name: 'subtitle', title: 'Sous-titre', type: 'text', description: "La phrase d'accroche sous le titre principal." },
        { name: 'cta_button_text', title: 'Texte du bouton CTA', type: 'string', initialValue: 'Découvrir le programme' },
        { name: 'video_url', title: 'URL de la vidéo de fond (optionnel)', type: 'url' },
      ],
    },

    // --- Section des 4 Atouts ---
    {
      name: 'features_section', title: 'Section des 4 Atouts', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Nom de l\'icône Lucide', type: 'string', description: 'Ex: video, award, infinity, users' },
          { name: 'title', title: 'Titre', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    },

    // --- Section Public Visé ---
    {
      name: 'audience_section', title: 'Section Public Visé', type: 'object',
      fields: [
        { name: 'title', title: 'Titre de la section', type: 'string', initialValue: 'Une formation pour tous les profils' },
        { name: 'subtitle', title: 'Sous-titre', type: 'text' },
        { 
          name: 'audience_cards', title: 'Cartes "Public"', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
              { name: 'title', title: 'Titre de la carte', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' },
            ],
          }],
        },
      ],
    },

    // --- Section Programme (Accordéon) ---
    {
      name: 'program_modules', title: 'Modules du Programme (Accordéon)', type: 'array',
      description: "Chaque élément sera une section dépliable dans l'accordéon.",
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Titre du module', type: 'string' },
          { name: 'details', title: 'Détails du module (texte simple)', type: 'text' },
        ],
      }],
    },

    // --- Section Tarifs ---
    {
      name: 'pricing_section', title: 'Section Tarifs', type: 'object',
      fields: [
        { name: 'title', title: 'Titre de la section', type: 'string', initialValue: 'Des formations accessibles à tous' },
        { name: 'subtitle', title: 'Sous-titre', type: 'text' },
        {
          name: 'pricing_cards', title: 'Cartes de tarifs', type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Titre de l\'offre', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' },
              { name: 'price', title: 'Prix', type: 'string' },
              { name: 'price_details', title: 'Détails du prix', type: 'string' },
              { name: 'cta_text', title: 'Texte du bouton', type: 'string' },
              { name: 'is_featured', title: 'Mettre en avant ?', type: 'boolean', initialValue: false },
            ],
          }],
        },
      ],
    },

    // --- Section SEO ---
    {
      name: 'seo',
      title: 'Paramètres SEO',
      type: 'seo',
      options: { collapsible: true, collapsed: true },
    },
  ],
};