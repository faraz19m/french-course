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
      type: 'exercise',
      exercise: {
        kind: 'listening',
        title: 'Écoute : trois amis racontent leur week-end',
        pace: 'natural',
        transcript: [
          {
            speaker: 'Nora',
            text: 'Alors, qu’est-ce que vous avez fait ce week-end ? Racontez-moi tout !',
            delivery: 'enthusiastic',
          },
          {
            speaker: 'Lucas',
            text: 'Samedi matin, je suis allé à Paris avec ma sœur. Nous avons pris le train de huit heures et nous sommes arrivés avant dix heures. Nous avons visité le musée des sciences, puis nous avons déjeuné dans un petit café.',
          },
          {
            speaker: 'Yanis',
            text: 'Est-ce que vous avez eu beau temps ? Il a beaucoup plu chez moi samedi matin.',
          },
          {
            speaker: 'Lucas',
            text: 'Il a plu pendant notre voyage, mais le soleil est revenu dans l’après-midi. Nous avons marché près de la Seine et j’ai envoyé plusieurs photos à mes parents.',
          },
          {
            speaker: 'Nora',
            text: 'Moi, je suis restée à la maison samedi. J’ai fini un livre, j’ai préparé une soupe et j’ai regardé un film. Dimanche, j’ai pris le bus pour aller chez ma grand-mère. Nous avons fait une longue promenade dans le parc.',
          },
          {
            speaker: 'Lucas',
            text: 'Et toi, Yanis, tu as encore joué au football ?',
          },
          {
            speaker: 'Yanis',
            text: 'Oui, mon équipe a participé à un tournoi dimanche. Nous avons gagné le premier match, mais nous avons perdu le deuxième. J’étais un peu déçu, puis notre entraîneuse nous a félicités pour nos efforts.',
            delivery: 'hesitant',
          },
          {
            speaker: 'Nora',
            text: 'Qu’est-ce que vous avez fait après le tournoi ?',
          },
          {
            speaker: 'Yanis',
            text: 'Nous avons mangé des pizzas ensemble et nous avons beaucoup ri. Je suis rentré chez moi vers neuf heures, très fatigué mais content.',
          },
          {
            speaker: 'Lucas',
            text: 'Finalement, nous avons tous passé un week-end bien rempli !',
            delivery: 'enthusiastic',
          },
        ],
        items: [
          {
            q: 'Comment Lucas est-il allé à Paris ?',
            options: ['En train', 'En bus', 'En voiture'],
            answer: 'En train',
          },
          {
            q: 'Qu’est-ce que Lucas et sa sœur ont visité ?',
            options: ['Le musée des sciences', 'Le Louvre', 'La tour Eiffel'],
            answer: 'Le musée des sciences',
          },
          {
            q: 'Nora est sortie samedi. Vrai ou faux ?',
            options: ['Vrai', 'Faux'],
            answer: 'Faux',
            why: 'Elle est restée à la maison samedi.',
          },
          {
            q: 'Combien de matchs l’équipe de Yanis a-t-elle gagnés ?',
            options: ['Un', 'Deux', 'Aucun'],
            answer: 'Un',
          },
          {
            q: 'Qu’ont-ils mangé après le tournoi ?',
            options: ['Des pizzas', 'Une soupe', 'Des sandwichs'],
            answer: 'Des pizzas',
          },
          {
            q: 'Qui a envoyé des photos à ses parents ?',
            options: ['Lucas', 'Nora', 'Yanis'],
            answer: 'Lucas',
          },
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
        'Le week-end dernier, Lucas est allé à Paris avec trois amis. Ils sont partis en train samedi matin à huit heures et sont arrivés deux heures plus tard. Après avoir déposé leurs sacs à l’hôtel, ils ont marché jusqu’à la Seine. Le temps a été frais, mais le soleil est apparu avant midi.',
        'Ils ont d’abord visité le musée du Louvre. Lucas a admiré les grandes salles, tandis que son amie Emma a pris beaucoup de photos dans la cour. La visite a duré presque trois heures. Ensuite, ils ont mangé dans un petit restaurant près du musée. Lucas a choisi une soupe et un sandwich ; ses amis ont commandé des salades.',
        'Dans l’après-midi, le groupe a traversé un jardin et a acheté quelques souvenirs. Le soir, ils ont vu la tour Eiffel illuminée. Ils sont montés au deuxième étage et ont observé les lumières de la ville. Après cette longue journée, tout le monde est rentré tôt à l’hôtel.',
        'Dimanche matin, ils ont pris un café dans une boulangerie, puis ils ont fait une promenade dans un quartier calme. Avant de partir, Lucas a envoyé une carte postale à ses parents. Il est rentré à la maison dimanche soir, fatigué mais content. « J’ai passé un week-end formidable et j’ai découvert beaucoup de choses ! » a-t-il dit.',
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
