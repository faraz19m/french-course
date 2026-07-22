import type { Lesson } from '../../types';

export const lesson09: Lesson = {
  id: 9,
  slug: 'restaurant',
  fr: 'Au restaurant',
  en: 'Food, ordering & partitives',
  grammarFocus: 'partitives du/de la/des, food, ordering',
  blocks: [
    {
      type: 'hero',
      title: 'This hour',
      goals: [
        'Partitive articles: <b>du, de la, des</b> ("some")',
        'Food & drink vocabulary',
        'Ordering politely with <i>je voudrais</i>',
      ],
      pills: ['du / de la / des', 'la nourriture', 'je voudrais'],
    },

    { type: 'heading', level: 2, n: '9.1', text: 'Partitive — "some / any"' },
    { type: 'prose', text: 'For unspecified quantities (some water, some bread):' },
    {
      type: 'table',
      head: ['Masc.', 'Fem.', 'Vowel', 'Plural'],
      rows: [['du (pain)', 'de la (salade)', "de l' (eau)", 'des (frites)']],
    },
    {
      type: 'note',
      text: 'After a negative, all become <b>de</b>: <i>Je ne mange pas <b>de</b> viande.</i>',
    },

    { type: 'heading', level: 2, n: '9.2', text: 'Food vocabulary' },
    {
      type: 'vocab',
      items: [
        { fr: 'le pain', pron: 'pan', en: 'bread' },
        { fr: "l'eau", pron: 'oh', en: 'water (f)' },
        { fr: 'le café', pron: 'ka-FAY', en: 'coffee' },
        { fr: 'la viande', pron: 'VYAND', en: 'meat' },
        { fr: 'le poisson', pron: 'pwa-SON', en: 'fish' },
        { fr: 'les légumes', pron: 'lay-GUUM', en: 'vegetables' },
        { fr: 'le fromage', pron: 'fro-MAZH', en: 'cheese' },
        { fr: 'le vin', pron: 'van', en: 'wine' },
        { fr: "l'addition", pron: 'a-dee-SYON', en: 'the bill (f)' },
      ],
    },

    { type: 'heading', level: 2, n: '9.3', text: 'Ordering politely' },
    {
      type: 'prose',
      text: '<b>Je voudrais…</b> (I would like) is softer than <i>je veux</i> (I want). <br/><i>Je voudrais un café, s’il vous plaît. — L’addition, s’il vous plaît.</i>',
    },

    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Choose the partitive',
        items: [
          { q: 'Je bois ___ eau.', options: ['du', 'de la', "de l'"], answer: "de l'" },
          { q: 'Il mange ___ pain.', options: ['du', 'de la', 'des'], answer: 'du' },
          { q: 'Nous voulons ___ frites.', options: ['du', 'de la', 'des'], answer: 'des' },
          { q: 'Je ne mange pas ___ viande.', options: ['de la', 'de', 'du'], answer: 'de' },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'fill',
        title: 'Ordering',
        items: [
          { q: "'I would like a coffee' → Je ___ un café.", blanks: [['voudrais']] },
          { q: "'The bill, please' → L'___, s'il vous plaît.", blanks: [['addition']] },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'listening',
        title: 'Écoute : la commande de Sophie',
        pace: 'natural',
        transcript: [
          {
            speaker: 'Serveuse',
            text: 'Bonjour madame. Bienvenue au restaurant Le Jardin. Vous avez choisi ?',
            delivery: 'enthusiastic',
          },
          {
            speaker: 'Sophie',
            text: 'Oui. Comme entrée, je voudrais une salade. Ensuite, je prends du poisson avec des légumes, s’il vous plaît.',
          },
          {
            speaker: 'Serveuse',
            text: 'Très bien. Aujourd’hui, le poisson est servi avec des carottes et des pommes de terre.',
          },
          {
            speaker: 'Sophie',
            text: 'Parfait. Est-ce que je peux avoir un peu de pain aussi ?',
          },
          {
            speaker: 'Serveuse',
            text: 'Bien sûr. Et comme boisson ? Nous avons du vin blanc et du jus de pomme.',
          },
          {
            speaker: 'Sophie',
            text: 'De l’eau, merci. Je ne veux pas de vin à midi.',
          },
          {
            speaker: 'Serveuse',
            text: 'Vous prenez un dessert ? La tarte aux pommes est très bonne.',
          },
          {
            speaker: 'Sophie',
            text: 'Non merci. Je n’ai plus faim. Un café et l’addition, s’il vous plaît.',
          },
        ],
        items: [
          {
            q: 'Qu’est-ce que Sophie commande ?',
            options: [
              'Une salade et du poisson',
              'De la viande et des frites',
              'Du fromage et du pain',
            ],
            answer: 'Une salade et du poisson',
          },
          { q: 'Que boit-elle ?', options: ['De l’eau', 'Du vin', 'Un café'], answer: 'De l’eau' },
          {
            q: 'Sophie prend un dessert. Vrai ou faux ?',
            options: ['Vrai', 'Faux'],
            answer: 'Faux',
            why: 'Elle n’a plus faim.',
          },
          {
            q: 'Quels légumes accompagnent le poisson ?',
            options: [
              'Des carottes et des pommes de terre',
              'Des tomates et des haricots',
              'Une salade verte',
            ],
            answer: 'Des carottes et des pommes de terre',
          },
          {
            q: 'Qu’est-ce qu’elle demande à la fin ?',
            options: ['Un café et l’addition', 'Le menu et du pain', 'Un dessert et du thé'],
            answer: 'Un café et l’addition',
          },
        ],
      },
    },

    {
      type: 'reading',
      title: 'Au restaurant',
      paragraphs: [
        'Ce vendredi soir, Claire et son ami Marc entrent dans un petit restaurant du centre-ville. Une serveuse leur apporte la carte et explique le menu du jour. Comme entrée, ils partagent une salade de tomates. Claire regarde ensuite les plats : elle voudrait du poisson avec des légumes, parce qu’elle ne mange pas souvent de viande.',
        'Marc préfère de la viande et des frites. Il commande le steak, mais demande peu de sel. Ils boivent une grande bouteille d’eau et prennent aussi un verre de vin. La serveuse apporte du pain frais et leur demande si tout va bien. Claire trouve son poisson excellent et Marc aime beaucoup les frites croustillantes.',
        'Après le repas, ils hésitent devant les desserts. Finalement, ils partagent une tarte aux pommes avec deux cafés. Claire demande ensuite l’addition : « L’addition, s’il vous plaît ! » Marc propose de payer, mais Claire préfère partager le prix. Ils remercient la serveuse avant de quitter le restaurant.',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        kind: 'mcq',
        title: 'Compréhension : au restaurant',
        items: [
          {
            q: 'Qu’est-ce que Claire voudrait manger ?',
            options: ['Du poisson', 'De la viande', 'Des frites'],
            answer: 'Du poisson',
          },
          {
            q: 'Marc préfère la viande. Vrai ou faux ?',
            options: ['Vrai', 'Faux'],
            answer: 'Vrai',
          },
          {
            q: 'Qu’est-ce qu’ils boivent ?',
            options: ["De l'eau et du vin", 'Du café', 'Du lait'],
            answer: "De l'eau et du vin",
          },
        ],
      },
    },
  ],
};
