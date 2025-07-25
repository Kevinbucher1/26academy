// /studio/schemas/pageFlexible.js

export default {
  name: 'pageFlexible',
  title: 'Page Flexible (HTML)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre interne (pour le CMS)',
      type: 'string',
      description: 'Ce titre n\'apparaît que dans le CMS pour vous aider à vous organiser.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'body_html',
      title: 'Code HTML de la page',
      description: 'Collez ici le code HTML complet du corps de la page.',
      type: 'code',
      // Spécifie le langage pour la coloration syntaxique dans le Studio
      options: {
        language: 'html',
      },
    },
  ],
};