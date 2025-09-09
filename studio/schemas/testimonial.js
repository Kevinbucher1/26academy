// studio/schemas/testimonial.js
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: "Nom de l'apprenant + date (ex : Mathilde, 25 août)",
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'poste',
      title: "Sous-titre (ex : Super tuteur)",
      type: 'string',
    }),
    defineField({
      name: 'avis',
      title: 'Avis',
      type: 'text',
    }),
   
  ],
})