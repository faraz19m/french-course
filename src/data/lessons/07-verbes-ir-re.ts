import type { Lesson } from '../../types';

export const lesson07: Lesson = {
  id: 7,
  slug: 'verbes-ir-re',
  fr: 'Verbes -IR / -RE',
  en: '-IR, -RE & irregular verbs',
  grammarFocus: 'finir, vendre, aller, faire, futur proche',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'Regular <b>-IR</b> verbs (finir)',
        'Regular <b>-RE</b> verbs (vendre)',
        'Two must-know irregulars: <b>aller</b> & <b>faire</b>',
        'The near future: <b>aller</b> + infinitive',
      ],
      pills: ['-ir', '-re', 'aller / faire', 'futur proche'],
    },

    { type: 'heading', level: 2, n: '7.1', text: '-IR verbs — <i>finir</i> (to finish)' },
    {
      type: 'table',
      head: ['Pronoun', 'Form'],
      rows: [
        ['je', 'finis'],
        ['tu', 'finis'],
        ['il/elle', 'finit'],
        ['nous', 'finissons'],
        ['vous', 'finissez'],
        ['ils/elles', 'finissent'],
      ],
    },

    { type: 'heading', level: 2, n: '7.2', text: '-RE verbs — <i>vendre</i> (to sell)' },
    {
      type: 'table',
      head: ['Pronoun', 'Form'],
      rows: [
        ['je', 'vends'],
        ['tu', 'vends'],
        ['il/elle', 'vend'],
        ['nous', 'vendons'],
        ['vous', 'vendez'],
        ['ils/elles', 'vendent'],
      ],
    },

    { type: 'heading', level: 2, n: '7.3', text: 'Irregulars you use daily' },
    {
      type: 'table',
      head: ['aller (to go)', 'faire (to do/make)'],
      rows: [
        ['je vais', 'je fais'],
        ['tu vas', 'tu fais'],
        ['il/elle va', 'il/elle fait'],
        ['nous allons', 'nous faisons'],
        ['vous allez', 'vous faites'],
        ['ils/elles vont', 'ils/elles font'],
      ],
    },
    {
      type: 'note',
      text: '<b>Aller</b> also means "to feel": <i>Comment allez-vous ? — Je vais bien.</i>',
    },

    { type: 'heading', level: 2, n: '7.4', text: 'Le futur proche — the near future' },
    {
      type: 'prose',
      text: 'To say what you’re <i>going to</i> do, use <b>aller</b> (present) + an <b>infinitive</b>. It’s the quickest way to talk about the future.',
    },
    {
      type: 'table',
      head: ['French', 'English'],
      rows: [
        ['je vais manger', "I'm going to eat"],
        ['tu vas partir', "you're going to leave"],
        ['il/elle va faire', 'he/she is going to do'],
        ['nous allons étudier', "we're going to study"],
        ['vous allez voir', "you're going to see"],
        ['ils/elles vont arriver', "they're going to arrive"],
      ],
    },
    {
      type: 'note',
      text: 'Negation wraps the conjugated <i>aller</i>: <i>Je <b>ne</b> vais <b>pas</b> manger.</i>',
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Conjugate',
        items: [
          { q: 'nous (finir) → nous ___', blanks: [['finissons']] },
          { q: 'il (vendre) → il ___', blanks: [['vend']] },
          { q: 'je (aller) → je ___', blanks: [['vais']] },
          { q: 'vous (faire) → vous ___', blanks: [['faites']] },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Pick the correct form',
        items: [
          { q: 'Ils ___ au cinéma. (aller)', options: ['vont', 'allez', 'va'], answer: 'vont' },
          { q: 'Nous ___ nos devoirs. (faire)', options: ['faisons', 'faites', 'font'], answer: 'faisons' },
          { q: 'Tu ___ le travail. (finir)', options: ['finit', 'finis', 'finissent'], answer: 'finis' },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Form the near future',
        items: [
          { q: 'I am going to eat → Je ___ manger.', blanks: [['vais']] },
          { q: 'We are going to leave → Nous ___ partir.', blanks: [['allons']] },
          { q: 'They are going to study → Ils ___ étudier.', blanks: [['vont']] },
        ],
      },
    },
  ],
};
