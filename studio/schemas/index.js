// /studio/schemas/index.js

import formation from './formation'
import category from './category'
import pageFlexible from './pageFlexible'
import seo from './seo'

// On exporte un tableau contenant tous nos schémas.
// L'ordre n'a pas d'importance ici.
export const schemaTypes = [formation, category, pageFlexible, seo]