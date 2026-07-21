import type { Lesson } from '../../types';

export const lesson12: Lesson = {
  id: 12,
  slug: 'passe-compose',
  fr: 'Le passé composé',
  en: 'Past tense — passé composé',
  grammarFocus: 'past tense with avoir & être',
  blocks: [
    {
      type: 'hero',
      title: 'Final hour — the past tense',
      goals: [
        'Talking about completed past actions',
        '<b>avoir</b> + past participle',
        'The <b>être</b> verbs (movement)',
        'Putting your whole A1 together',
      ],
      pills: ['passé composé', 'avoir + participe', 'être verbs'],
    },

    { type: 'heading', level: 2, n: '12.1', text: 'Formula' },
    {
      type: 'prose',
      text: 'The passé composé = <b>helper verb (avoir/être) in present</b> + <b>past participle</b>.',
    },
    {
      type: 'table',
      head: ['Verb type', 'Past participle', 'Example'],
      rows: [
        ['-ER → -é', 'parler → parlé', "J'ai parlé"],
        ['-IR → -i', 'finir → fini', "J'ai fini"],
        ['-RE → -u', 'vendre → vendu', "J'ai vendu"],
      ],
    },
    { type: 'prose', text: '<i>Hier, j’<b>ai mangé</b> une pizza.</i> (Yesterday I ate a pizza.)' },

    { type: 'heading', level: 2, n: '12.2', text: 'The être verbs' },
    {
      type: 'prose',
      text: 'A group of ~14 verbs (mostly movement) use <b>être</b> instead. The participle then agrees with the subject. Remember <b>DR & MRS VANDERTRAMP</b> — key ones:',
    },
    {
      type: 'table',
      head: ['Verb', 'Participle', 'Example'],
      rows: [
        ['aller', 'allé', 'je suis allé(e)'],
        ['venir', 'venu', 'il est venu'],
        ['arriver', 'arrivé', 'elle est arrivée'],
        ['partir', 'parti', 'nous sommes parti(e)s'],
        ['naître', 'né', 'je suis né(e)'],
      ],
    },
    {
      type: 'note',
      text: '<b>Agreement:</b> with <i>être</i>, add -e (fem), -s (plural): <i>Elle est allé<b>e</b>. Ils sont allé<b>s</b>.</i>',
    },

    { type: 'heading', level: 2, n: '12.3', text: 'Irregular participles to memorise' },
    {
      type: 'vocab',
      items: [
        { fr: 'avoir → eu', pron: 'u', en: 'had' },
        { fr: 'être → été', pron: 'ay-TAY', en: 'been' },
        { fr: 'faire → fait', pron: 'feh', en: 'done' },
        { fr: 'voir → vu', pron: 'vu', en: 'seen' },
        { fr: 'prendre → pris', pron: 'pree', en: 'taken' },
        { fr: 'boire → bu', pron: 'bu', en: 'drunk' },
      ],
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Form the passé composé',
        items: [
          { q: "je (parler) → j'ai ___", blanks: [['parlé', 'parle']] },
          { q: 'nous (finir) → nous avons ___', blanks: [['fini']] },
          {
            q: 'elle (aller) → elle est ___',
            blanks: [['allée']],
            hint: 'Agree with the subject!',
          },
          { q: 'ils (faire) → ils ont ___', blanks: [['fait']] },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'avoir or être helper?',
        items: [
          { q: "J'___ mangé une pomme.", options: ['ai', 'suis'], answer: 'ai' },
          { q: 'Elle ___ arrivée à Paris.', options: ['a', 'est'], answer: 'est' },
          { q: 'Nous ___ vu le film.', options: ['avons', 'sommes'], answer: 'avons' },
          { q: 'Ils ___ partis tôt.', options: ['ont', 'sont'], answer: 'sont' },
        ],
      },
    },

    {
      type: 'hero',
      title: '🎉 Félicitations !',
      goals: [
        "You've covered the full A1 grammar map: être & avoir, all three verb groups plus key irregulars, articles, gender, adjectives, negation, questions, time, possessives, prepositions, and the past tense.",
        'Cycle back through the lessons and re-run every exercise until you score 100% without hesitation — that’s A1 mastery.',
      ],
    },

    {
      type: 'reading',
      title: 'Le week-end de Lucas',
      paragraphs: [
        'Le week-end dernier, Lucas est allé à Paris avec ses amis. Ils ont visité le musée du Louvre et ont mangé dans un petit restaurant.',
        'Le soir, ils ont vu la tour Eiffel. Dimanche, Lucas est rentré à la maison, fatigué mais content. « J’ai passé un week-end formidable ! » a-t-il dit.',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : le week-end de Lucas',
        items: [
          {
            q: 'Où est allé Lucas le week-end dernier ?',
            options: ['À Paris', 'À Lyon', 'À Nice'],
            answer: 'À Paris',
          },
          {
            q: 'Ils ont visité le Louvre. Vrai ou faux ?',
            options: ['Vrai', 'Faux'],
            answer: 'Vrai',
          },
          {
            q: 'Quand Lucas est-il rentré à la maison ?',
            options: ['Dimanche', 'Samedi', 'Lundi'],
            answer: 'Dimanche',
          },
        ],
      },
    },
  ],
};
