// /studio/schemas/index.js

import parcours from './parcours'
import category from './category'
import pageFlexible from './pageFlexible'
import seo from './seo'
import testimonial from './testimonial'

// On exporte un tableau contenant tous nos schémas.
// L'ordre n'a pas d'importance ici.
export const schemaTypes = [parcours, category, pageFlexible, seo, testimonial]