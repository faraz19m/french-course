import type { Lesson } from '../../types';

export const lesson09: Lesson = {
  id: 9,
  slug: 'restaurant',
  fr: 'Au restaurant',
  en: 'Food, ordering & partitives',
  grammarFocus: 'partitives du/de la/des, food, ordering',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'Partitive articles: <b>du, de la, des</b> ("some")',
        'Food & drink vocabulary',
        'Ordering politely with <i>je voudrais</i>',
      ],
      pills: ['du / de la / des', 'la nourriture', 'je voudrais'],
    },

    { type: 'heading', level: 2, n: '9.1', text: 'Partitive — "some / any"' },
    { type: 'prose', text: 'For unspecified quantities (some water, some bread):' },
    {
      type: 'table',
      head: ['Masc.', 'Fem.', 'Vowel', 'Plural'],
      rows: [['du (pain)', 'de la (salade)', "de l' (eau)", 'des (frites)']],
    },
    {
      type: 'note',
      text: 'After a negative, all become <b>de</b>: <i>Je ne mange pas <b>de</b> viande.</i>',
    },

    { type: 'heading', level: 2, n: '9.2', text: 'Food vocabulary' },
    {
      type: 'vocab',
      items: [
        { fr: 'le pain', pron: 'pan', en: 'bread' },
        { fr: "l'eau", pron: 'oh', en: 'water (f)' },
        { fr: 'le café', pron: 'ka-FAY', en: 'coffee' },
        { fr: 'la viande', pron: 'VYAND', en: 'meat' },
        { fr: 'le poisson', pron: 'pwa-SON', en: 'fish' },
        { fr: 'les légumes', pron: 'lay-GUUM', en: 'vegetables' },
        { fr: 'le fromage', pron: 'fro-MAZH', en: 'cheese' },
        { fr: 'le vin', pron: 'van', en: 'wine' },
        { fr: "l'addition", pron: 'a-dee-SYON', en: 'the bill (f)' },
      ],
    },

    { type: 'heading', level: 2, n: '9.3', text: 'Ordering politely' },
    {
      type: 'prose',
      text: '<b>Je voudrais…</b> (I would like) is softer than <i>je veux</i> (I want). <br/><i>Je voudrais un café, s’il vous plaît. — L’addition, s’il vous plaît.</i>',
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Choose the partitive',
        items: [
          { q: 'Je bois ___ eau.', options: ['du', 'de la', "de l'"], answer: "de l'" },
          { q: 'Il mange ___ pain.', options: ['du', 'de la', 'des'], answer: 'du' },
          { q: 'Nous voulons ___ frites.', options: ['du', 'de la', 'des'], answer: 'des' },
          { q: 'Je ne mange pas ___ viande.', options: ['de la', 'de', 'du'], answer: 'de' },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Ordering',
        items: [
          { q: "'I would like a coffee' → Je ___ un café.", blanks: [['voudrais']] },
          { q: "'The bill, please' → L'___, s'il vous plaît.", blanks: [['addition']] },
        ],
      },
    },

    {
      type: 'reading',
      title: 'Au restaurant',
      paragraphs: [
        'Au restaurant, Claire regarde le menu. Elle voudrait du poisson avec des légumes. Son ami Marc préfère de la viande et des frites.',
        'Ils boivent de l’eau et un verre de vin. Après le repas, Claire demande l’addition : « L’addition, s’il vous plaît ! »',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : au restaurant',
        items: [
          { q: 'Qu’est-ce que Claire voudrait manger ?', options: ['Du poisson', 'De la viande', 'Des frites'], answer: 'Du poisson' },
          { q: 'Marc préfère la viande. Vrai ou faux ?', options: ['Vrai', 'Faux'], answer: 'Vrai' },
          { q: 'Qu’est-ce qu’ils boivent ?', options: ["De l'eau et du vin", 'Du café', 'Du lait'], answer: "De l'eau et du vin" },
        ],
      },
    },
  ],
};
