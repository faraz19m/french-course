import type { Lesson } from '../../types';

export const lesson08: Lesson = {
  id: 8,
  slug: 'heure-jours',
  fr: "L'heure & les jours",
  en: 'Time, days & routines',
  grammarFocus: 'time, days, months, routines',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: ['Telling the time', 'Days of the week & months', 'Talking about your daily routine'],
      pills: ["l'heure", 'les jours', 'reflexives'],
    },

    { type: 'heading', level: 2, n: '8.1', text: 'Telling time' },
    {
      type: 'prose',
      text: 'Use <b>Il est …</b>. <i>Il est deux heures</i> (2:00). Add minutes: <i>deux heures dix</i>. Quarter/half: <i>et quart</i> (:15), <i>et demie</i> (:30), <i>moins le quart</i> (:45).',
    },
    {
      type: 'table',
      head: ['Clock', 'French'],
      rows: [
        ['1:00', 'Il est une heure'],
        ['3:30', 'Il est trois heures et demie'],
        ['6:15', 'Il est six heures et quart'],
        ['8:45', 'Il est neuf heures moins le quart'],
      ],
    },

    { type: 'heading', level: 2, n: '8.2', text: 'Days & months' },
    {
      type: 'prose',
      text: '<b>Jours:</b> lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche. <br/><b>Note:</b> not capitalised in French.',
    },
    {
      type: 'vocab',
      items: [
        { fr: "aujourd'hui", pron: 'oh-zhoor-DWEE', en: 'today' },
        { fr: 'demain', pron: 'duh-MAN', en: 'tomorrow' },
        { fr: 'hier', pron: 'yair', en: 'yesterday' },
        { fr: 'le matin', pron: 'ma-TAN', en: 'morning' },
        { fr: 'le soir', pron: 'swahr', en: 'evening' },
        { fr: 'la semaine', pron: 'suh-MEN', en: 'week' },
      ],
    },

    { type: 'heading', level: 2, n: '8.3', text: 'Reflexive verbs for routine' },
    {
      type: 'prose',
      text: 'Daily actions often use reflexive verbs: <i>je <b>me</b> lève</i> (I get up), <i>je <b>me</b> couche</i> (I go to bed).',
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Write the time in French',
        items: [
          { q: '2:00 → Il est deux ___ .', blanks: [['heures']] },
          { q: '4:30 → Il est quatre heures et ___ .', blanks: [['demie']] },
          { q: 'Monday in French = ___', blanks: [['lundi']] },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Vocabulary check',
        items: [
          { q: "'tomorrow' =", options: ['hier', 'demain', "aujourd'hui"], answer: 'demain' },
          { q: "'the morning' =", options: ['le soir', 'le matin', 'la nuit'], answer: 'le matin' },
        ],
      },
    },
  ],
};
