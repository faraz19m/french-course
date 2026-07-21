import type { Lesson } from '../../types';

export const lesson06: Lesson = {
  id: 6,
  slug: 'adjectifs',
  fr: 'Les adjectifs',
  en: 'Adjectives & descriptions',
  grammarFocus: 'agreement, position, colours',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'Adjectives agree in gender & number',
        'Where adjectives go (usually after!)',
        'Colours & common descriptors',
      ],
      pills: ['agreement', 'BAGS', 'colours'],
    },

    { type: 'heading', level: 2, n: '6.1', text: 'Agreement' },
    {
      type: 'prose',
      text: 'Adjectives change to match the noun. Default: add <b>-e</b> for feminine, <b>-s</b> for plural.',
    },
    {
      type: 'table',
      head: ['Masc.', 'Fem.', 'Masc. pl.', 'Fem. pl.'],
      rows: [
        ['grand', 'grande', 'grands', 'grandes'],
        ['petit', 'petite', 'petits', 'petites'],
        ['vert', 'verte', 'verts', 'vertes'],
      ],
    },
    {
      type: 'note',
      text: 'Already ending in <b>-e</b>? No change for feminine: <i>rouge, jeune, calme</i> stay the same.',
    },

    { type: 'heading', level: 2, n: '6.2', text: 'Position — mostly AFTER the noun' },
    {
      type: 'prose',
      text: '<i>une voiture <b>rouge</b></i> (a red car), <i>un livre <b>intéressant</b></i>. But a small set go BEFORE — remember <b>BAGS</b>: Beauty, Age, Goodness, Size.',
    },
    {
      type: 'table',
      head: ['Before (BAGS)', 'Example'],
      rows: [
        ['beau/joli', 'une jolie maison'],
        ['jeune/vieux', 'un vieux film'],
        ['bon/mauvais', 'un bon café'],
        ['grand/petit', 'une petite table'],
      ],
    },

    { type: 'heading', level: 2, n: '6.3', text: 'Colours' },
    {
      type: 'vocab',
      items: [
        { fr: 'rouge', pron: 'roozh', en: 'red' },
        { fr: 'bleu', pron: 'bluh', en: 'blue' },
        { fr: 'vert', pron: 'vair', en: 'green' },
        { fr: 'jaune', pron: 'zhohn', en: 'yellow' },
        { fr: 'noir', pron: 'nwahr', en: 'black' },
        { fr: 'blanc', pron: 'blon', en: 'white' },
      ],
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Agree the adjective',
        items: [
          { q: 'une maison (grand) → une maison ___', blanks: [['grande']] },
          { q: 'des livres (petit) → des ___ livres', blanks: [['petits']] },
          { q: 'une voiture (vert) → une voiture ___', blanks: [['verte']] },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Before or after?',
        items: [
          { q: 'a red car =', options: ['une rouge voiture', 'une voiture rouge'], answer: 'une voiture rouge' },
          { q: 'a beautiful house =', options: ['une belle maison', 'une maison belle'], answer: 'une belle maison' },
        ],
      },
    },
  ],
};
