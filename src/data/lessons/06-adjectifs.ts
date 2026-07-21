import type { Lesson } from '../../types';

export const lesson06: Lesson = {
  id: 6,
  slug: 'adjectifs',
  fr: 'Les adjectifs',
  en: 'Adjectives & descriptions',
  grammarFocus: 'agreement, position, colours, c’est vs il est',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'Adjectives agree in gender & number',
        'Where adjectives go (usually after!)',
        'Colours & common descriptors',
        'Identifying vs describing: <b>c’est</b> vs <b>il est</b>',
      ],
      pills: ['agreement', 'BAGS', 'colours', "c'est / il est"],
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

    { type: 'heading', level: 2, n: '6.4', text: 'c’est vs il/elle est' },
    {
      type: 'prose',
      text: 'Use <b>c’est</b> + a noun to <i>identify</i> something, and <b>il/elle est</b> + an adjective to <i>describe</i> it. <i>C’est un livre. Il est intéressant.</i>',
    },
    {
      type: 'table',
      head: ['Use', 'Structure', 'Example'],
      rows: [
        ['Identify', 'c’est + noun', 'C’est un café.'],
        ['Describe', 'il/elle est + adjective', 'Elle est grande.'],
        ['Job / nationality', 'il/elle est + noun (no article)', 'Elle est médecin.'],
      ],
    },
    {
      type: 'note',
      text: 'After <i>être</i>, jobs and nationalities drop the article: <i>Il est professeur</i>. But with <b>c’est</b>, keep it: <i>C’est un professeur.</i>',
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
          {
            q: 'a red car =',
            options: ['une rouge voiture', 'une voiture rouge'],
            answer: 'une voiture rouge',
          },
          {
            q: 'a beautiful house =',
            options: ['une belle maison', 'une maison belle'],
            answer: 'une belle maison',
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'c’est or il/elle est?',
        items: [
          {
            q: '___ un bon film.',
            options: ["C'est", 'Il est'],
            answer: "C'est",
            why: "c'est + noun.",
          },
          {
            q: '___ très intéressant.',
            options: ["C'est", 'Il est'],
            answer: 'Il est',
            why: 'il est + adjective.',
          },
          {
            q: 'Voici Marie. ___ anglaise.',
            options: ["C'est", 'Elle est'],
            answer: 'Elle est',
            why: 'elle est + adjective/nationality.',
          },
        ],
      },
    },

    {
      type: 'reading',
      title: 'Le nouvel appartement',
      paragraphs: [
        'Marie a un nouvel appartement. Il est petit mais joli. Les murs sont blancs et la porte est bleue.',
        'Dans le salon, il y a un grand canapé rouge et une petite table noire. Marie est très contente : c’est un bel appartement !',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : le nouvel appartement',
        items: [
          {
            q: 'De quelle couleur est la porte ?',
            options: ['Bleue', 'Rouge', 'Blanche'],
            answer: 'Bleue',
          },
          {
            q: 'L’appartement est grand. Vrai ou faux ?',
            options: ['Vrai', 'Faux'],
            answer: 'Faux',
            why: 'Il est petit mais joli.',
          },
          {
            q: 'Comment est le canapé ?',
            options: ['Grand et rouge', 'Petit et noir', 'Bleu'],
            answer: 'Grand et rouge',
          },
        ],
      },
    },
  ],
};
