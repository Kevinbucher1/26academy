// /studio/sanity.config.js

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import {codeInput} from '@sanity/code-input' // <-- 1. Importer le plugin


export default defineConfig({
  name: 'default',
  title: 'Mon Site de Formation', // Le nom qui s'affiche en haut du Studio

  // Remplacez par les infos de votre projet
  projectId: '29lzrddu',
  dataset: 'production',

  plugins: [
    structureTool(),
    media(),
    codeInput(),
  ],

  schema: {
    // <-- 2. UTILISER LA LISTE IMPORTÉE ICI
    types: schemaTypes,
  },
})
