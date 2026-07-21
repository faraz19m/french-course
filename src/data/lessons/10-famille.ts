import type { Lesson } from '../../types';

export const lesson10: Lesson = {
  id: 10,
  slug: 'famille',
  fr: 'La famille',
  en: 'Family & possessives',
  grammarFocus: 'family, possessives mon/ma/mes',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'Family vocabulary',
        'Possessive adjectives (<i>mon, ma, mes…</i>)',
        'Describing relationships',
      ],
      pills: ['la famille', 'mon / ma / mes'],
    },

    { type: 'heading', level: 2, n: '10.1', text: 'Family words' },
    {
      type: 'vocab',
      items: [
        { fr: 'le père', pron: 'pair', en: 'father' },
        { fr: 'la mère', pron: 'mair', en: 'mother' },
        { fr: 'le frère', pron: 'frair', en: 'brother' },
        { fr: 'la sœur', pron: 'suhr', en: 'sister' },
        { fr: 'le fils', pron: 'feess', en: 'son' },
        { fr: 'la fille', pron: 'fee-yuh', en: 'daughter/girl' },
        { fr: 'les parents', pron: 'pa-RON', en: 'parents' },
        { fr: 'le mari', pron: 'ma-REE', en: 'husband' },
        { fr: 'la femme', pron: 'fam', en: 'wife/woman' },
      ],
    },

    { type: 'heading', level: 2, n: '10.2', text: 'Possessive adjectives' },
    { type: 'prose', text: 'They agree with the <b>thing owned</b>, not the owner.' },
    {
      type: 'table',
      head: ['', 'Masc.', 'Fem.', 'Plural'],
      rows: [
        ['my', 'mon', 'ma', 'mes'],
        ['your (tu)', 'ton', 'ta', 'tes'],
        ['his/her', 'son', 'sa', 'ses'],
        ['our', 'notre', 'notre', 'nos'],
        ['your (vous)', 'votre', 'votre', 'vos'],
        ['their', 'leur', 'leur', 'leurs'],
      ],
    },
    {
      type: 'note',
      text: '<b>son/sa</b> means BOTH his and her — gender follows the noun: <i>sa mère</i> = his OR her mother. Before a vowel, <i>ma/ta/sa</i> → <b>mon/ton/son</b>: <i>mon amie</i>.',
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Choose the possessive',
        items: [
          { q: '___ père (my, m)', options: ['mon', 'ma', 'mes'], answer: 'mon' },
          { q: '___ sœur (my, f)', options: ['mon', 'ma', 'mes'], answer: 'ma' },
          { q: '___ parents (my, pl)', options: ['ma', 'mon', 'mes'], answer: 'mes' },
          { q: '___ amie (my + vowel, f)', options: ['ma', 'mon', 'mes'], answer: 'mon', why: 'Before a vowel, ma → mon.' },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Family vocabulary',
        items: [
          { q: 'mother in French = ___', blanks: [['la mère', 'mère', 'mere']] },
          { q: 'brother in French = ___', blanks: [['le frère', 'frère', 'frere']] },
        ],
      },
    },
  ],
};
