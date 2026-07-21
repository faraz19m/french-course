import type { Lesson } from '../../types';

export const lesson04: Lesson = {
  id: 4,
  slug: 'verbes-er',
  fr: 'Verbes en -ER',
  en: 'Regular -ER verbs (present)',
  grammarFocus: 'regular -ER present tense',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'The biggest verb group: <b>-ER verbs</b>',
        'One ending pattern unlocks ~1000 verbs',
        'Common everyday verbs',
      ],
      pills: ['-er endings', 'present tense'],
    },

    { type: 'heading', level: 2, n: '4.1', text: 'The -ER pattern' },
    {
      type: 'prose',
      text: 'Drop <b>-er</b> from the infinitive, add these endings. Example: <b>parler</b> (to speak) → stem <i>parl-</i>.',
    },
    {
      type: 'table',
      head: ['Pronoun', 'Ending', 'parler'],
      rows: [
        ['je', '-e', 'parle'],
        ['tu', '-es', 'parles'],
        ['il/elle', '-e', 'parle'],
        ['nous', '-ons', 'parlons'],
        ['vous', '-ez', 'parlez'],
        ['ils/elles', '-ent', 'parlent'],
      ],
    },
    {
      type: 'note',
      text: '<b>Pronunciation trick:</b> <i>parle, parles, parlent</i> all sound identical — the endings <i>-e/-es/-ent</i> are silent. Only <i>-ons</i> and <i>-ez</i> are pronounced.',
    },

    { type: 'heading', level: 2, n: '4.2', text: 'High-frequency -ER verbs' },
    {
      type: 'vocab',
      items: [
        { fr: 'parler', pron: 'par-LAY', en: 'to speak' },
        { fr: 'aimer', pron: 'ay-MAY', en: 'to like/love' },
        { fr: 'habiter', pron: 'a-bee-TAY', en: 'to live' },
        { fr: 'travailler', pron: 'tra-va-YAY', en: 'to work' },
        { fr: 'manger', pron: 'mon-ZHAY', en: 'to eat' },
        { fr: 'regarder', pron: 'ruh-gar-DAY', en: 'to watch' },
        { fr: 'écouter', pron: 'ay-koo-TAY', en: 'to listen' },
        { fr: 'étudier', pron: 'ay-tu-DYAY', en: 'to study' },
      ],
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Conjugate the -ER verb',
        items: [
          { q: 'Je (parler) → je ___ français.', blanks: [['parle']] },
          { q: 'Nous (habiter) → nous ___ à Lyon.', blanks: [['habitons']] },
          { q: 'Ils (aimer) → ils ___ le café.', blanks: [['aiment']] },
          { q: 'Tu (travailler) → tu ___ ?', blanks: [['travailles']] },
          { q: 'Vous (manger) → vous ___ ?', blanks: [['mangez']] },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Choose the right ending',
        items: [
          { q: 'Elle ___ la musique.', options: ['écoute', 'écoutes', 'écoutent'], answer: 'écoute' },
          { q: 'Nous ___ le week-end.', options: ['regardez', 'regardons', 'regarde'], answer: 'regardons' },
          { q: "Vous ___ l'anglais.", options: ['étudie', 'étudiez', 'étudient'], answer: 'étudiez' },
        ],
      },
    },

    {
      type: 'reading',
      title: 'La journée de Sophie',
      paragraphs: [
        'Sophie habite à Lyon. Elle travaille dans une école : elle est professeur.',
        'Le matin, elle écoute la radio et mange un croissant. Elle aime beaucoup son travail. Le soir, elle regarde un film ou parle avec ses amis.',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : la journée de Sophie',
        items: [
          { q: 'Où habite Sophie ?', options: ['À Lyon', 'À Paris', 'À Nice'], answer: 'À Lyon' },
          { q: 'Quel est le travail de Sophie ?', options: ['Professeur', 'Médecin', 'Étudiante'], answer: 'Professeur' },
          { q: 'Le soir, Sophie travaille. Vrai ou faux ?', options: ['Vrai', 'Faux'], answer: 'Faux', why: 'Le soir, elle regarde un film ou parle avec ses amis.' },
        ],
      },
    },
  ],
};
