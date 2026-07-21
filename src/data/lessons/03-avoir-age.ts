import type { Lesson } from '../../types';

export const lesson03: Lesson = {
  id: 3,
  slug: 'avoir-age',
  fr: "Avoir & l'âge",
  en: 'The verb avoir, age & numbers',
  grammarFocus: 'avoir, numbers 0–100, il y a',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'The verb <b>avoir</b> (to have)',
        'Numbers 0–100',
        'Telling your age',
        'There is / there are — <i>il y a</i>',
      ],
      pills: ['avoir', 'numbers', 'il y a'],
    },

    { type: 'heading', level: 2, n: '3.1', text: 'The verb <i>avoir</i> (to have)' },
    {
      type: 'table',
      head: ['French', 'English'],
      rows: [
        ["j'ai", 'I have'],
        ['tu as', 'you have'],
        ['il/elle a', 'he/she has'],
        ['nous avons', 'we have'],
        ['vous avez', 'you have'],
        ['ils/elles ont', 'they have'],
      ],
    },
    {
      type: 'note',
      text: '<b>Careful:</b> <i>ils ont</i> (they have) vs <i>ils sont</i> (they are). The link-sound differs: "eelz-ON" vs "eel-SON".',
    },

    { type: 'heading', level: 2, n: '3.2', text: 'Numbers 0–100' },
    {
      type: 'table',
      head: ['0–5', '6–10', '11–15', '16–20'],
      rows: [
        ['zéro', 'six', 'onze', 'seize'],
        ['un', 'sept', 'douze', 'dix-sept'],
        ['deux', 'huit', 'treize', 'dix-huit'],
        ['trois', 'neuf', 'quatorze', 'dix-neuf'],
        ['quatre / cinq', 'dix', 'quinze', 'vingt'],
      ],
    },
    {
      type: 'prose',
      text: '<b>Tens:</b> vingt (20), trente (30), quarante (40), cinquante (50), soixante (60). Combine: <i>vingt et un</i> (21), <i>trente-deux</i> (32).',
    },
    {
      type: 'note',
      text: '<b>70–100 get playful:</b> <i>soixante-dix</i> (70 = "sixty-ten"), <i>soixante et onze</i> (71), <i>quatre-vingts</i> (80 = "four-twenties"), <i>quatre-vingt-un</i> (81), <i>quatre-vingt-dix</i> (90), <i>quatre-vingt-onze</i> (91), <b>cent</b> (100).',
    },

    { type: 'heading', level: 2, n: '3.3', text: 'Age uses <i>avoir</i>, not <i>être</i>!' },
    {
      type: 'note',
      text: 'French says <i>"I <b>have</b> 25 years"</i>: <b>J’ai vingt-cinq ans.</b> — <i>Quel âge avez-vous ?</i> = How old are you?',
    },

    { type: 'heading', level: 3, text: 'Il y a — there is / there are' },
    {
      type: 'prose',
      text: '<i>Il y a un chat.</i> (There is a cat.) — <i>Il y a des livres.</i> (There are books.)',
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Conjugate avoir',
        items: [
          { q: "J'___ un frère.", options: ['ai', 'as', 'a'], answer: 'ai' },
          { q: 'Ils ___ deux enfants.', options: ['sont', 'ont', 'avez'], answer: 'ont' },
          { q: 'Vous ___ un stylo ?', options: ['avez', 'avons', 'as'], answer: 'avez' },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Age & numbers',
        items: [
          { q: 'How old are you? → Quel âge ___-vous ?', blanks: [['avez']] },
          {
            q: 'I am 30 → J’ai ___ ans.',
            blanks: [['trente']],
            hint: 'Write the number as a French word.',
          },
          { q: '21 in French = ___', blanks: [['vingt et un', 'vingt-et-un']] },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Write the number in French',
        items: [
          { q: '12 = ___', blanks: [['douze']] },
          { q: '16 = ___', blanks: [['seize']] },
          { q: '40 = ___', blanks: [['quarante']] },
          { q: '70 = ___', blanks: [['soixante-dix']] },
          { q: '80 = ___', blanks: [['quatre-vingts', 'quatre-vingt']] },
          { q: '100 = ___', blanks: [['cent']] },
        ],
      },
    },

    {
      type: 'reading',
      title: 'La famille de Marc',
      paragraphs: [
        'Marc a vingt-cinq ans. Il a une sœur et un frère. Sa sœur a trente ans et son frère a dix-huit ans.',
        'Dans la maison, il y a un chien et deux chats. Marc aime sa famille. Le week-end, ils mangent ensemble.',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : la famille de Marc',
        items: [
          {
            q: 'Quel âge a Marc ?',
            options: ['Vingt-cinq ans', 'Trente ans', 'Dix-huit ans'],
            answer: 'Vingt-cinq ans',
          },
          { q: 'Combien de chats y a-t-il ?', options: ['Deux', 'Un', 'Trois'], answer: 'Deux' },
          { q: 'Marc a une sœur. Vrai ou faux ?', options: ['Vrai', 'Faux'], answer: 'Vrai' },
        ],
      },
    },
  ],
};
