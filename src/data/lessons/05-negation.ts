import type { Lesson } from '../../types';

export const lesson05: Lesson = {
  id: 5,
  slug: 'negation',
  fr: 'La négation',
  en: 'Negation & asking questions',
  grammarFocus: 'ne…pas, questions, question words',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'Saying "not" with <b>ne … pas</b>',
        'Three ways to ask a question',
        'Question words (who, what, where…)',
      ],
      pills: ['ne … pas', 'est-ce que', 'question words'],
    },

    { type: 'heading', level: 2, n: '5.1', text: 'Negation: ne … pas' },
    {
      type: 'prose',
      text: 'Wrap the verb: <b>ne</b> + verb + <b>pas</b>. Before a vowel, <i>ne</i> → <b>n’</b>.',
    },
    {
      type: 'table',
      head: ['Positive', 'Negative'],
      rows: [
        ['Je parle anglais.', 'Je ne parle pas anglais.'],
        ['Il a un chien.', "Il n'a pas de chien."],
        ['Nous sommes prêts.', 'Nous ne sommes pas prêts.'],
      ],
    },
    {
      type: 'note',
      text: '<b>de rule:</b> after a negative, <i>un/une/des</i> become <b>de</b>: <i>J’ai un chat → Je n’ai pas <b>de</b> chat.</i>',
    },

    { type: 'heading', level: 2, n: '5.2', text: 'Three ways to ask yes/no questions' },
    {
      type: 'table',
      head: ['Method', 'Example', 'Register'],
      rows: [
        ['Intonation', 'Tu parles français ?', 'casual'],
        ['Est-ce que', 'Est-ce que tu parles français ?', 'neutral'],
        ['Inversion', 'Parles-tu français ?', 'formal'],
      ],
    },

    { type: 'heading', level: 2, n: '5.3', text: 'Question words' },
    {
      type: 'vocab',
      items: [
        { fr: 'qui', pron: 'kee', en: 'who' },
        { fr: 'que / quoi', pron: 'kuh / kwah', en: 'what' },
        { fr: 'où', pron: 'oo', en: 'where' },
        { fr: 'quand', pron: 'kon', en: 'when' },
        { fr: 'comment', pron: 'ko-MON', en: 'how' },
        { fr: 'pourquoi', pron: 'poor-KWAH', en: 'why' },
        { fr: 'combien', pron: 'kom-BYAN', en: 'how much/many' },
        { fr: 'quel(le)', pron: 'kel', en: 'which/what' },
      ],
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Make it negative',
        items: [
          {
            q: 'Je parle anglais. → Je ___ parle ___ anglais.',
            blanks: [['ne'], ['pas']],
            hint: 'Wrap the verb: ne … pas.',
          },
          { q: "Il a un chien. → Il n'a pas ___ chien.", blanks: [['de']] },
          {
            q: 'Elle aime le café. → Elle ___ aime ___ le café.',
            blanks: [["n'", 'ne'], ['pas']],
            hint: 'Before a vowel, ne becomes n’.',
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Choose the question word',
        items: [
          { q: '___ habites-tu ? (place)', options: ['Où', 'Quand', 'Qui'], answer: 'Où' },
          {
            q: '___ ça coûte ? (price)',
            options: ['Comment', 'Combien', 'Pourquoi'],
            answer: 'Combien',
          },
          { q: '___ est-ce ? (identity)', options: ['Qui', 'Où', 'Quand'], answer: 'Qui' },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'listening',
        title: 'Écoute : où est Emma ?',
        transcript: [
          '— Salut Emma, où es-tu ? Est-ce que tu es à la maison ?',
          '— Non, je ne suis pas à la maison. Je suis à la bibliothèque.',
          '— Tu travailles ?',
          '— Non, je ne travaille pas. Je cherche un livre pour mon cours de français.',
          '— Pourquoi est-ce que tu ne prends pas le livre à la maison ?',
          '— Parce que je n’ai pas d’ordinateur aujourd’hui. Et la bibliothèque ferme à six heures.',
        ],
        items: [
          {
            q: 'Où est Emma ?',
            options: ['À la bibliothèque', 'À la maison', 'Au café'],
            answer: 'À la bibliothèque',
          },
          {
            q: 'Emma travaille. Vrai ou faux ?',
            options: ['Vrai', 'Faux'],
            answer: 'Faux',
            why: 'Elle ne travaille pas.',
          },
          {
            q: 'Qu’est-ce qu’elle cherche ?',
            options: ['Un livre', 'Son téléphone', 'Un café'],
            answer: 'Un livre',
          },
          {
            q: 'Pourquoi Emma reste-t-elle à la bibliothèque ?',
            options: [
              'Elle n’a pas d’ordinateur aujourd’hui',
              'Elle travaille à six heures',
              'Sa maison est fermée',
            ],
            answer: 'Elle n’a pas d’ordinateur aujourd’hui',
          },
        ],
      },
    },

    {
      type: 'reading',
      title: 'Au téléphone',
      paragraphs: [
        '— Allô Paul ? Est-ce que tu es à la maison ?',
        '— Non, je ne suis pas à la maison. Je suis au café. Je ne vois pas Chloé.',
        '— Tu manges quelque chose ? Le gâteau au chocolat est très bon dans ce café.',
        '— Non, je ne mange pas et je ne bois rien. Je n’ai pas faim. J’attends Chloé depuis vingt minutes, mais elle n’arrive pas. Et toi, où es-tu ?',
        '— Je suis à la gare. Mon train ne part pas parce qu’il y a un problème. Je n’aime pas attendre ! Je vais prendre le bus et je peux venir au café après.',
        '— Bonne idée ! Ne te dépêche pas : Chloé et moi, nous ne partons pas avant six heures.',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : au téléphone',
        items: [
          {
            q: 'Où est Paul ?',
            options: ['Au café', 'À la maison', 'À la gare'],
            answer: 'Au café',
          },
          {
            q: 'Paul mange quelque chose. Vrai ou faux ?',
            options: ['Vrai', 'Faux'],
            answer: 'Faux',
          },
          {
            q: 'Qui est à la gare ?',
            options: ["L'autre personne", 'Paul', 'Le serveur'],
            answer: "L'autre personne",
          },
        ],
      },
    },
  ],
};
