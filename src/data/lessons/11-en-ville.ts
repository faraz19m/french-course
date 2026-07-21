import type { Lesson } from '../../types';

export const lesson11: Lesson = {
  id: 11,
  slug: 'en-ville',
  fr: 'En ville',
  en: 'The city, directions & prepositions',
  grammarFocus: 'places, à/de contractions, directions',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'Places in town',
        'Prepositions of place',
        'Asking for & giving directions',
        '<i>à + le = au</i> contractions',
      ],
      pills: ['la ville', 'au / du / aux', 'directions'],
    },

    { type: 'heading', level: 2, n: '11.1', text: 'Places' },
    {
      type: 'vocab',
      items: [
        { fr: 'la gare', pron: 'gar', en: 'station' },
        { fr: 'la banque', pron: 'bonk', en: 'bank' },
        { fr: "l'hôpital", pron: 'o-pee-TAL', en: 'hospital' },
        { fr: 'le magasin', pron: 'ma-ga-ZAN', en: 'shop' },
        { fr: 'la pharmacie', pron: 'far-ma-SEE', en: 'pharmacy' },
        { fr: 'la rue', pron: 'ruu', en: 'street' },
      ],
    },

    { type: 'heading', level: 2, n: '11.2', text: 'Contractions with à and de' },
    {
      type: 'table',
      head: ['à + article', '→', 'de + article', '→'],
      rows: [
        ['à + le', 'au', 'de + le', 'du'],
        ['à + les', 'aux', 'de + les', 'des'],
        ['à + la', 'à la (no change)', 'de + la', 'de la'],
      ],
    },
    { type: 'prose', text: '<i>Je vais <b>au</b> restaurant. Je viens <b>du</b> café.</i>' },

    { type: 'heading', level: 2, n: '11.3', text: 'Prepositions of place' },
    {
      type: 'vocab',
      items: [
        { fr: 'sur', pron: 'suur', en: 'on' },
        { fr: 'sous', pron: 'soo', en: 'under' },
        { fr: 'dans', pron: 'don', en: 'in' },
        { fr: 'devant', pron: 'duh-VON', en: 'in front of' },
        { fr: 'derrière', pron: 'dair-YAIR', en: 'behind' },
        { fr: 'à côté de', pron: 'a ko-TAY', en: 'next to' },
      ],
    },
    {
      type: 'note',
      text: '<b>Directions:</b> <i>tout droit</i> (straight ahead), <i>à gauche</i> (left), <i>à droite</i> (right).',
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Contractions',
        items: [
          { q: 'Je vais à + le cinéma → Je vais ___ cinéma.', blanks: [['au']] },
          { q: 'Je viens de + les magasins → Je viens ___ magasins.', blanks: [['des']] },
          { q: 'Il va à + les toilettes → Il va ___ toilettes.', blanks: [['aux']] },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Prepositions',
        items: [
          { q: 'The cat is ON the table → Le chat est ___ la table.', options: ['sous', 'sur', 'dans'], answer: 'sur' },
          { q: "'turn left' → tournez à ___", options: ['droite', 'gauche', 'droit'], answer: 'gauche' },
        ],
      },
    },

    {
      type: 'reading',
      title: 'Où est la pharmacie ?',
      paragraphs: [
        '— Pardon monsieur, où est la pharmacie ?',
        '— C’est facile. Vous allez tout droit, puis vous tournez à gauche. La pharmacie est à côté de la banque, en face du café.',
        '— C’est loin ?',
        '— Non, c’est à cinq minutes. C’est tout près !',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : où est la pharmacie ?',
        items: [
          { q: 'Où est la pharmacie ?', options: ['À côté de la banque', 'À côté de la gare', 'Dans le café'], answer: 'À côté de la banque' },
          { q: 'La pharmacie est loin. Vrai ou faux ?', options: ['Vrai', 'Faux'], answer: 'Faux', why: 'C’est à cinq minutes, tout près.' },
          { q: 'Pour aller à la pharmacie, on tourne à…', options: ['gauche', 'droite', 'tout droit'], answer: 'gauche' },
        ],
      },
    },
  ],
};
