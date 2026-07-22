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
          {
            q: 'The cat is ON the table → Le chat est ___ la table.',
            options: ['sous', 'sur', 'dans'],
            answer: 'sur',
          },
          {
            q: "'turn left' → tournez à ___",
            options: ['droite', 'gauche', 'droit'],
            answer: 'gauche',
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'listening',
        title: 'Écoute : le chemin de la gare',
        pace: 'natural',
        transcript: [
          {
            speaker: 'Voyageuse',
            text: 'Bonjour monsieur, excusez-moi. Je suis devant la mairie et je cherche la gare. Pouvez-vous m’aider ?',
            delivery: 'hesitant',
          },
          {
            speaker: 'Habitant',
            text: 'Bien sûr ! D’abord, traversez la place et continuez tout droit dans la rue Victor-Hugo. Vous allez passer devant une boulangerie, puis devant une pharmacie.',
          },
          {
            speaker: 'Voyageuse',
            text: 'Est-ce que je dois tourner après la pharmacie ?',
          },
          {
            speaker: 'Habitant',
            text: 'Non, ne tournez pas à la pharmacie. Continuez jusqu’à la banque, au bout de la rue. Après la banque, tournez à droite et marchez environ deux cents mètres.',
          },
          {
            speaker: 'Voyageuse',
            text: 'Et au premier carrefour, je prends quelle rue ?',
          },
          {
            speaker: 'Habitant',
            text: 'Prenez la deuxième rue à gauche, juste après le grand parc, puis continuez tout droit. Vous verrez un hôtel jaune sur votre gauche et un petit café sur votre droite. La gare est en face de l’hôtel, à côté du café. Son entrée principale se trouve derrière l’arrêt de bus. Le trajet dure environ dix minutes.',
          },
          {
            speaker: 'Voyageuse',
            text: 'Merci beaucoup ! Avec vos explications, je vais facilement trouver la gare.',
            delivery: 'enthusiastic',
          },
        ],
        items: [
          {
            q: 'Jusqu’à quel bâtiment faut-il continuer avant de tourner ?',
            options: ['La banque', 'L’hôtel', 'Le café'],
            answer: 'La banque',
          },
          {
            q: 'Après la banque, il faut tourner…',
            options: ['à droite', 'à gauche', 'tout droit'],
            answer: 'à droite',
          },
          {
            q: 'Où est la gare ?',
            options: ['En face de l’hôtel', 'Derrière la banque', 'Dans la deuxième rue à droite'],
            answer: 'En face de l’hôtel',
          },
          {
            q: 'Le trajet dure combien de temps ?',
            options: ['Dix minutes', 'Cinq minutes', 'Vingt minutes'],
            answer: 'Dix minutes',
          },
          {
            q: 'Où se trouve l’entrée principale de la gare ?',
            options: ['Derrière l’arrêt de bus', 'Devant la pharmacie', 'À gauche de la mairie'],
            answer: 'Derrière l’arrêt de bus',
          },
        ],
      },
    },

    {
      type: 'reading',
      title: 'Où est la pharmacie ?',
      paragraphs: [
        '— Pardon monsieur, où est la pharmacie ?',
        '— C’est facile. Continuez tout droit dans cette rue jusqu’au premier feu. Vous allez passer devant une boulangerie et un petit hôtel. Au feu, vous tournez à gauche dans la rue Victor-Hugo. La pharmacie est à côté de la banque, en face du café.',
        '— Est-ce que je dois traverser la grande place ? Je vois une place derrière l’église.',
        '— Non, ne traversez pas cette place. Elle est dans la direction opposée. Après avoir tourné à gauche, marchez environ deux cents mètres. Vous verrez d’abord la poste à votre droite, puis une librairie. La banque se trouve juste après la librairie.',
        '— C’est loin d’ici ? Je dois retrouver une amie à la gare dans vingt minutes.',
        '— Non, c’est à cinq minutes à pied. C’est tout près ! Quand vous sortez de la pharmacie, vous pouvez rejoindre la gare en prenant la deuxième rue à droite. La gare est derrière le musée.',
        '— Merci beaucoup pour vos explications. Je ne connais pas encore bien ce quartier.',
        'Le monsieur sourit et montre le chemin.',
        '— Je vous en prie. Faites attention en traversant au feu et bonne journée !',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : où est la pharmacie ?',
        items: [
          {
            q: 'Où est la pharmacie ?',
            options: ['À côté de la banque', 'À côté de la gare', 'Dans le café'],
            answer: 'À côté de la banque',
          },
          {
            q: 'La pharmacie est loin. Vrai ou faux ?',
            options: ['Vrai', 'Faux'],
            answer: 'Faux',
            why: 'C’est à cinq minutes, tout près.',
          },
          {
            q: 'Pour aller à la pharmacie, on tourne à…',
            options: ['gauche', 'droite', 'tout droit'],
            answer: 'gauche',
          },
        ],
      },
    },
  ],
};
