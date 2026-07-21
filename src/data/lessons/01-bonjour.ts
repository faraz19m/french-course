import type { Lesson } from '../../types';

export const lesson01: Lesson = {
  id: 1,
  slug: 'bonjour',
  fr: 'Bonjour !',
  en: 'Greetings & introductions',
  grammarFocus: 'être, pronouns, tu/vous, nationalities',
  blocks: [
    {
      type: 'hero',
      title: "What you'll master this hour",
      goals: [
        'Greeting people formally and informally',
        'The subject pronouns (<i>je, tu, vous…</i>)',
        'Your first verb: <b>être</b> (to be)',
        "Saying your name and asking someone's",
        "Your nationality and where you're from",
      ],
      pills: ['tu vs vous', 'être', 'accents', 'nationalités'],
    },

    { type: 'heading', level: 2, n: '1.1', text: 'Greetings' },
    {
      type: 'lede',
      text: 'French draws a hard line between formal (<i>vous</i>) and informal (<i>tu</i>). Use <i>vous</i> with strangers, elders, and in shops.',
    },
    {
      type: 'table',
      head: ['French', 'Pronunciation', 'English'],
      rows: [
        ['Bonjour', 'bon-ZHOOR', 'Hello / Good day'],
        ['Bonsoir', 'bon-SWAHR', 'Good evening'],
        ['Salut', 'sa-LU', 'Hi / Bye (informal)'],
        ['Au revoir', 'oh ruh-VWAHR', 'Goodbye'],
        ['Merci', 'mair-SEE', 'Thank you'],
        ["S'il vous plaît", 'seel voo PLEH', 'Please (formal)'],
      ],
    },
    {
      type: 'note',
      text: "<b>Comment ça va ?</b> = How's it going? Reply: <i>Ça va bien, merci</i> (I'm well) or just <i>Ça va</i>.",
    },

    { type: 'heading', level: 2, n: '1.2', text: 'Subject pronouns' },
    {
      type: 'table',
      head: ['French', 'English', 'Note'],
      rows: [
        ['je', 'I', "→ j' before a vowel"],
        ['tu', 'you (informal)', 'one person you know'],
        ['il / elle', 'he / she', "also 'it'"],
        ['nous', 'we', '—'],
        ['vous', 'you (formal / plural)', 'polite OR more than one'],
        ['ils / elles', 'they', 'elles = all-female group'],
      ],
    },

    { type: 'heading', level: 2, n: '1.3', text: 'The verb <i>être</i> (to be)' },
    {
      type: 'table',
      head: ['French', 'English', 'Pron.'],
      rows: [
        ['je suis', 'I am', 'zhuh swee'],
        ['tu es', 'you are', 'tu eh'],
        ['il/elle est', 'he/she is', 'eel eh'],
        ['nous sommes', 'we are', 'noo som'],
        ['vous êtes', 'you are', 'voo zet'],
        ['ils/elles sont', 'they are', 'eel son'],
      ],
    },
    {
      type: 'note',
      text: "<b>Introducing yourself:</b> <i>Je m'appelle Marie.</i> (My name is Marie.) — <i>Et vous ?</i> (And you?)",
    },

    {
      type: 'vocab',
      items: [
        { fr: 'oui', pron: 'wee', en: 'yes' },
        { fr: 'non', pron: 'non', en: 'no' },
        { fr: 'et', pron: 'eh', en: 'and' },
        { fr: 'monsieur', pron: 'muh-SYUH', en: 'sir / Mr' },
        { fr: 'madame', pron: 'ma-DAM', en: "ma'am / Mrs" },
        { fr: 'enchanté', pron: 'on-shon-TAY', en: 'pleased to meet you' },
      ],
    },

    { type: 'heading', level: 2, n: '1.4', text: "Nationalities & where you're from" },
    {
      type: 'prose',
      text: "Give your nationality with <b>être</b>, and where you're from with <b>venir de</b> and <b>habiter à</b>. Nationalities have a masculine and a feminine form — and are never capitalised.",
    },
    {
      type: 'table',
      head: ['Masculine', 'Feminine', 'English'],
      rows: [
        ['français', 'française', 'French'],
        ['anglais', 'anglaise', 'English'],
        ['canadien', 'canadienne', 'Canadian'],
        ['américain', 'américaine', 'American'],
        ['indien', 'indienne', 'Indian'],
      ],
    },
    {
      type: 'note',
      text: "<i>Je suis <b>indien</b></i> (m) / <i>Je suis <b>indienne</b></i> (f). — <i>Je viens <b>d'Inde</b>. J'habite <b>à</b> Londres.</i> (The masculine/feminine agreement is covered in Lesson 6.)",
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Choose the correct form of être',
        items: [
          { q: 'Je ___ étudiant.', options: ['suis', 'es', 'est'], answer: 'suis' },
          { q: 'Vous ___ français ?', options: ['sont', 'êtes', 'es'], answer: 'êtes' },
          { q: 'Elle ___ professeur.', options: ['est', 'es', 'suis'], answer: 'est' },
          { q: 'Nous ___ à Paris.', options: ['sont', 'sommes', 'êtes'], answer: 'sommes' },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Fill in the blank — greetings',
        items: [
          { q: '— ___, comment ça va ? (informal hello)', blanks: [['salut']] },
          { q: "Je m'___ Thomas.", blanks: [['appelle']] },
          { q: '— Merci ! — De ___ ! (you’re welcome)', blanks: [['rien']] },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'tu or vous?',
        items: [
          { q: 'Talking to a close friend →', options: ['tu', 'vous'], answer: 'tu', why: 'Informal, one person you know.' },
          { q: 'Addressing a shopkeeper →', options: ['tu', 'vous'], answer: 'vous', why: 'Strangers and service situations take vous.' },
          { q: 'Speaking to two people at once →', options: ['tu', 'vous'], answer: 'vous', why: 'vous is also the plural "you".' },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Nationalities & origin',
        items: [
          { q: 'Paul is Canadian (m) → Paul est ___.', blanks: [['canadien']] },
          { q: 'Sophie is English (f) → Sophie est ___.', blanks: [['anglaise']] },
          { q: 'I live in London → J’habite ___ Londres.', blanks: [['à']] },
        ],
      },
    },

    {
      type: 'reading',
      title: 'Les présentations',
      paragraphs: [
        "Bonjour ! Je m'appelle Camille. Je suis française et j'habite à Paris. Je suis étudiante à l'université.",
        "Voici mon ami Tom. Il est anglais, mais il habite à Nice. Il travaille dans un café. Nous sommes amis. Enchanté !",
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : les présentations',
        items: [
          { q: 'Comment s’appelle la femme ?', options: ['Camille', 'Tom', 'Marie'], answer: 'Camille' },
          { q: 'Camille est française. Vrai ou faux ?', options: ['Vrai', 'Faux'], answer: 'Vrai' },
          { q: 'Où habite Tom ?', options: ['À Paris', 'À Nice', 'À Londres'], answer: 'À Nice' },
          {
            q: 'Tom est professeur. Vrai ou faux ?',
            options: ['Vrai', 'Faux'],
            answer: 'Faux',
            why: 'Il travaille dans un café.',
          },
        ],
      },
    },
  ],
};
