// /studio/schemas/parcours.js

export default {
  // --- CONFIGURATION GÉNÉRALE DU DOCUMENT ---
  name: 'parcours',
  title: 'Parcours de Formation',
  type: 'document',

  // --- DÉFINITION DES ONGLETS (GROUPES) ---
  groups: [
    {
      name: 'content',
      title: 'Contenu de la Page',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],

  // --- CHAMPS DE SAISIE ---
  fields: [

    {
      name: 'internalTitle',
      title: 'Titre Interne (pour le back-office)',
      type: 'string',
      group: 'content',
      description: "Ce titre n'est visible que dans Sanity et sert à vous repérer. Il n'apparaît pas sur le site public.",
      validation: Rule => Rule.required().error('Le titre interne est obligatoire pour l\'organisation.'),
    },
    {
      name: 'slug',
      title: 'URL Personnalisée (Slug)',
      type: 'slug',
      group: 'content',
      options: {
        source: 'titre', // Base le slug sur le "Titre de la formation"
        maxLength: 96,
      },
      description: "Ceci est la fin de l'URL. Cliquez sur 'Generate' pour le créer automatiquement à partir du titre, ou écrivez le vôtre.",
      validation: Rule => Rule.required().error("L'URL est obligatoire."),
    },

    // --- Section HERO ---
    {
      name: 'titre',
      title: 'Titre de la formation',
      description: 'Le titre principal qui apparaît en grand en haut de la page.',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required().error('Le titre est obligatoire.'),
    },

    {
      name: 'category',
      title: 'Catégorie du Parcours',
      type: 'reference',
      description: 'Choisissez la catégorie à laquelle ce parcours appartient.',
      group: 'content', 
      to: [{ type: 'category' }], 
      validation: Rule => Rule.required().error('Chaque parcours doit avoir une catégorie.'),
    },
    
    {
      name: 'sousTitrePrincipal',
      title: 'Sous-titre (partie principale)',
      description: "Ex: 'Effectuer les opérations comptables courantes'",
      type: 'string',
      group: 'content',
    },
    {
      name: 'codeRNCP',
      title: 'Code RNCP (ou autre)',
      description: "Ex: 'RNCP35749BC01'",
      type: 'string',
      group: 'content',
    },

    {
      name: 'descriptionHero',
      title: 'Description de la section Hero',
      description: "Le paragraphe d'introduction de la formation.",
      type: 'text',
      group: 'content',
    },
    {
      name: 'imageHero',
      title: 'Image de la section Hero',
      description: "L'image qui apparaît à droite du texte d'introduction.",
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    },
    {
        name: 'urlFormulaire',
        title: 'URL du bouton "Commencer la formation"',
        description: "Le lien vers lequel le visiteur sera redirigé.",
        type: 'url',
        group: 'content',
    },

    // --- Section "Informations pratiques" ---
    {
      name: 'informationsPratiques',
      title: 'Informations Pratiques',
      description: "Ajoutez jusqu'à 5 blocs d'informations (Modalités, Durée, etc.).",
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titre', title: 'Titre du bloc', type: 'string', description: 'Ex: MODALITÉS' },
            { name: 'valeur', title: 'Contenu', type: 'text', description: 'Le texte affiché dans le bloc.' },
            { name: 'logo', title: 'Logo (optionnel)', description: 'Utilisé pour le bloc "Certificateur".', type: 'image' },
          ],
          preview: {
            select: {
              title: 'titre',
              subtitle: 'valeur',
              media: 'logo'
            }
          }
        },
      ],
      validation: Rule => Rule.max(5).warning('Vous ne devriez pas dépasser 5 blocs.'),
    },

    // --- Section "Objectifs / Public visé / Prérequis" ---
    {
      name: 'objectifs',
      title: 'Objectifs',
      description: "Listez les objectifs de la formation (jusqu'à 7).",
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      validation: Rule => Rule.max(7),
    },
    {
      name: 'publicVise',
      title: 'Public Visé',
      description: "Listez les publics visés (jusqu'à 7).",
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      validation: Rule => Rule.max(7),
    },
    {
      name: 'prerequis',
      title: 'Prérequis',
      description: "Listez les prérequis (jusqu'à 7).",
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      validation: Rule => Rule.max(7),
    },

    // --- Section "Programme détaillé" ---
    {
      name: 'programme',
      title: 'Programme Détaillé',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'competences',
          title: 'Liste des compétences',
          description: "Ajoutez autant de compétences que nécessaire.",
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'titre', title: 'Titre de la compétence', type: 'string' },
                { name: 'elements', title: 'Points clés de la compétence', type: 'array', of: [{ type: 'string' }] },
              ],
              preview: {
                select: {
                  title: 'titre'
                }
              }
            },
          ],
        },
      ],
    },

    // --- Section "BLOC PHOTO INTERMEDIAIRE" ---

     {
      name: 'blocIntermediaire',
      title: 'Bloc personnalisé (Image + Texte)',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'activer',
          title: 'Activer ce bloc ?',
          type: 'boolean',
          description: 'Cochez cette case pour afficher ce bloc sur la page.',
          initialValue: false,
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
        },
        {
          name: 'titre',
          title: 'Titre (H2)',
          type: 'string',
        },
        {
          name: 'contenu',
          title: 'Contenu du paragraphe',
          type: 'text',
        },
      ],
    },

    // --- Section "Nos offres" ---
    {
      name: 'offres',
      title: 'Nos Offres',
      description: "Ajoutez jusqu'à 3 offres commerciales.",
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titre', title: "Titre de l'offre", type: 'string' },
            { name: 'prix', title: 'Prix', type: 'string' },
            { name: 'elements', title: "Arguments de l'offre", type: 'array', of: [{ type: 'string' }], validation: Rule => Rule.max(6) },
          ],
          preview: {
            select: {
              title: 'titre',
              subtitle: 'prix'
            }
          }
        },
      ],
      validation: Rule => Rule.max(3),
    },

    // --- Section "Solutions de financement" ---
    {
      name: 'financements',
      title: 'Solutions de Financement',
      description: "Ajoutez jusqu'à 5 blocs de financement.",
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titre', title: 'Titre', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
          preview: {
            select: {
              title: 'titre'
            }
          }
        },
      ],
      validation: Rule => Rule.max(5),
    },

    // --- Section "Que faire après la formation" ---
     {
      name: 'apresFormation',
      title: 'Que faire après la formation',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'titre',
              title: 'Titre du bloc', // Ex: "Postes accessibles"
              type: 'string'
            },
            {
              name: 'elements',
              title: 'Points clés', // Ex: "Comptable junior", "Assistant comptable"...
              type: 'array',
              of: [{ type: 'string' }]
            }
          ],
          preview: {
            select: {
              title: 'titre'
            }
          }
        }
      ]
    },

    // --- Section "Informations complémentaires" ---
    {
        name: 'imageFranceCompetences',
        title: 'Image France Compétences (RS ou RNCP)',
        type: 'image',
        group: 'content',
    },
    {
      name: 'informationsComplementaires',
      title: 'Informations Complémentaires',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'contenu',
          title: 'Contenu riche',
          description: "Le bloc de texte où vous pouvez mettre du gras, des liens, etc.",
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              lists: [],
              marks: {
                decorators: [
                  { title: 'Gras', value: 'strong' },
                  { title: 'Italique', value: 'em' },
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Lien externe',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    
    // --- Section Témoignages ---
    {
      name: 'testimonials',
      title: 'Témoignages à afficher',
      type: 'array',
      group: 'content',
      description: 'Sélectionnez les témoignages que vous souhaitez faire apparaître sur cette page.',
      of: [{
        type: 'reference',
        to: [{ type: 'testimonial' }]
      }]
    },

    // --- CHAMPS SEO ---
    {
      name: 'metaTitle',
      title: 'Titre pour le SEO',
      type: 'string',
      group: 'seo',
      description: "Le titre qui apparaîtra dans l'onglet du navigateur et les résultats Google. Longueur recommandée : 50-60 caractères.",
      validation: Rule => Rule.max(60).warning('Un titre plus court est souvent plus efficace.'),
    },
    {
      name: 'metaDescription',
      title: 'Description pour le SEO',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'La description qui apparaîtra sous le titre dans les résultats Google. Longueur recommandée : 120-155 caractères.',
      validation: Rule => Rule.max(155).error('La description est trop longue pour Google.'),
    },
    {
      name: 'openGraphImage',
      title: 'Image pour le partage social',
      type: 'image',
      group: 'seo',
      description: "L'image qui s'affichera lorsque vous partagerez le lien sur des plateformes comme Facebook ou LinkedIn. Format recommandé : 1200x630 pixels.",
    },
  ],
  preview: {
    select: {
      title: 'internalTitle',
      subtitle: 'category.title',
    },
  },
};