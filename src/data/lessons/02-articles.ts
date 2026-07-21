import type { Lesson } from '../../types';

export const lesson02: Lesson = {
  id: 2,
  slug: 'articles',
  fr: 'Les articles',
  en: 'Nouns, gender & articles',
  grammarFocus: 'gender, le/la/les, un/une/des, plurals',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'Every French noun is masculine or feminine',
        'Definite articles: <i>le, la, les</i>',
        'Indefinite articles: <i>un, une, des</i>',
        'Making nouns plural',
      ],
      pills: ['le / la / les', 'un / une / des', 'plurals'],
    },

    { type: 'heading', level: 2, n: '2.1', text: 'Gender of nouns' },
    {
      type: 'prose',
      text: "Every noun has a gender. There's no perfect rule, so <b>learn each noun with its article</b>. Endings give hints:",
    },
    {
      type: 'table',
      head: ['Often masculine', 'Often feminine'],
      rows: [
        ['-age, -ment, -eau', '-tion, -té, -ette'],
        ['le fromage, le moment', 'la nation, la liberté'],
      ],
    },

    { type: 'heading', level: 2, n: '2.2', text: 'Definite vs indefinite' },
    {
      type: 'table',
      head: ['', 'Masc.', 'Fem.', 'Plural'],
      rows: [
        ['the (definite)', 'le', 'la', 'les'],
        ['a / some (indef.)', 'un', 'une', 'des'],
      ],
    },
    {
      type: 'note',
      text: "<b>l'</b> replaces <i>le/la</i> before a vowel or silent h: <i>l'ami, l'école, l'hôtel</i>.",
    },

    { type: 'heading', level: 2, n: '2.3', text: 'Plurals' },
    {
      type: 'prose',
      text: 'Usually add <b>-s</b> (silent!). Words ending in <i>-eau</i> → <b>-eaux</b>. Words ending in <i>-s, -x, -z</i> don’t change.',
    },
    {
      type: 'table',
      head: ['Singular', 'Plural'],
      rows: [
        ['le livre', 'les livres'],
        ['un château', 'des châteaux'],
        ['le bus', 'les bus'],
      ],
    },

    {
      type: 'vocab',
      items: [
        { fr: 'la maison', pron: 'mai-ZON', en: 'house' },
        { fr: 'le chat', pron: 'shah', en: 'cat' },
        { fr: "l'école", pron: 'ay-KOL', en: 'school (f)' },
        { fr: 'le café', pron: 'ka-FAY', en: 'coffee/café' },
        { fr: 'la table', pron: 'TAH-bl', en: 'table' },
        { fr: "l'ami", pron: 'a-MEE', en: 'friend (m)' },
      ],
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: "Pick le, la, or l'",
        items: [
          { q: '___ maison (f)', options: ['le', 'la', "l'"], answer: 'la' },
          { q: '___ école (f, vowel)', options: ['la', "l'", 'le'], answer: "l'" },
          { q: '___ chat (m)', options: ['le', 'la', "l'"], answer: 'le' },
          { q: '___ hôtel (m, silent h)', options: ['le', "l'", 'la'], answer: "l'" },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Make it plural',
        items: [
          { q: 'un livre → deux ___', blanks: [['livres']] },
          { q: 'le château → les ___', blanks: [['châteaux', 'chateaux']] },
          { q: 'une table → des ___', blanks: [['tables']] },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'un or une?',
        items: [
          { q: '___ maison (f)', options: ['un', 'une'], answer: 'une' },
          { q: '___ café (m)', options: ['un', 'une'], answer: 'un' },
          { q: '___ table (f)', options: ['un', 'une'], answer: 'une' },
        ],
      },
    },
  ],
};
