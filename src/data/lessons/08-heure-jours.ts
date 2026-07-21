import type { Lesson } from '../../types';

export const lesson08: Lesson = {
  id: 8,
  slug: 'heure-jours',
  fr: "L'heure & les jours",
  en: 'Time, dates, weather & routines',
  grammarFocus: 'time, days, months, seasons, weather',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'Telling the time',
        'Days, months & dates',
        'Seasons & the weather (<i>il fait…</i>)',
        'Talking about your daily routine',
      ],
      pills: ["l'heure", 'les jours', 'la météo', 'reflexives'],
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
      type: 'prose',
      text: '<b>Mois:</b> janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre.',
    },
    {
      type: 'prose',
      text: '<b>Dates:</b> <i>le</i> + number + month — <i>le 14 juillet</i>. The 1st is special: <i>le <b>premier</b> mai</i> (not <i>un</i>).',
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

    { type: 'heading', level: 2, n: '8.3', text: 'Seasons & the weather' },
    {
      type: 'prose',
      text: 'Talk about the weather with <b>il fait</b>: <i>il fait beau</i> (it’s nice), <i>il fait chaud</i> (it’s hot), <i>il fait froid</i> (it’s cold). Also <i>il pleut</i> (it’s raining), <i>il neige</i> (it’s snowing).',
    },
    {
      type: 'vocab',
      items: [
        { fr: 'le printemps', pron: 'pran-TAN', en: 'spring' },
        { fr: "l'été", pron: 'ay-TAY', en: 'summer (m)' },
        { fr: "l'automne", pron: 'o-TON', en: 'autumn (m)' },
        { fr: "l'hiver", pron: 'ee-VAIR', en: 'winter (m)' },
        { fr: 'il fait beau', pron: 'eel feh BO', en: "it's nice out" },
        { fr: 'il pleut', pron: 'eel PLUH', en: "it's raining" },
      ],
    },
    {
      type: 'note',
      text: 'Seasons take <b>en</b> — <i>en été, en automne, en hiver</i> — except spring: <i><b>au</b> printemps</i>.',
    },

    { type: 'heading', level: 2, n: '8.4', text: 'Reflexive verbs for routine' },
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
    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Months, dates & weather',
        items: [
          { q: 'July in French = ___', blanks: [['juillet']] },
          { q: "It's cold → Il fait ___.", blanks: [['froid']] },
          { q: 'the 1st of May → le ___ mai', blanks: [['premier']] },
        ],
      },
    },

    {
      type: 'reading',
      title: 'La semaine de Thomas',
      paragraphs: [
        'Thomas se lève à sept heures. Le lundi et le mercredi, il travaille. Le samedi, il ne travaille pas : il fait du sport.',
        'En hiver, il fait froid, alors il reste à la maison. Son anniversaire est le premier mars. Aujourd’hui, il fait beau et Thomas est content.',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : la semaine de Thomas',
        items: [
          { q: 'À quelle heure Thomas se lève-t-il ?', options: ['À sept heures', 'À huit heures', 'À six heures'], answer: 'À sept heures' },
          { q: 'Quand est l’anniversaire de Thomas ?', options: ['Le premier mars', 'Le premier mai', 'Le 14 juillet'], answer: 'Le premier mars' },
          { q: 'Le samedi, Thomas travaille. Vrai ou faux ?', options: ['Vrai', 'Faux'], answer: 'Faux', why: 'Le samedi, il fait du sport.' },
        ],
      },
    },
  ],
};
