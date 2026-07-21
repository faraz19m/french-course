# Le Carnet — French A1 Course

A complete, self-paced French **A1** course: 12 one-hour lessons from _"Bonjour"_ to the
_passé composé_, each with reference tables, vocabulary, and interactive self-checking exercises.

Built as a small React + TypeScript single-page app. Progress (completed lessons and best
exercise scores) is saved in the browser, so you can pick up where you left off.

## The course

| #   | Lesson             | Grammar focus                                |
| --- | ------------------ | -------------------------------------------- |
| 1   | Bonjour !          | être, pronouns, tu/vous, nationalities       |
| 2   | Les articles       | gender, le/la/les, un/une/des, plurals       |
| 3   | Avoir & l'âge      | avoir, numbers 0–100, il y a                 |
| 4   | Verbes en -ER      | regular -ER present tense                    |
| 5   | La négation        | ne…pas, questions, question words            |
| 6   | Les adjectifs      | agreement, position, colours, c'est/il est   |
| 7   | Verbes -IR / -RE   | finir, vendre, aller, faire, futur proche    |
| 8   | L'heure & les jours| time, dates, seasons, weather, routines      |
| 9   | Au restaurant      | partitives du/de la/des, food, ordering      |
| 10  | La famille         | family, possessives mon/ma/mes               |
| 11  | En ville           | places, à/de contractions, directions        |
| 12  | Le passé composé   | past tense with avoir & être                 |

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # type-check + production build into dist/
npm run preview # preview the production build locally
```

## Project structure

```
src/
├─ main.tsx                 # entry point
├─ App.tsx                  # routes (HashRouter — GitHub Pages friendly)
├─ types.ts                 # Lesson / ContentBlock / Exercise content model
├─ styles/index.css         # design system (one global stylesheet)
├─ hooks/
│  ├─ useProgress.ts        # localStorage-backed progress store
│  └─ ProgressContext.tsx   # shares one store across the app
├─ components/
│  ├─ Layout.tsx, Sidebar.tsx
│  ├─ ContentRenderer.tsx   # maps a ContentBlock → component
│  ├─ content/              # HeroCard, Heading, Prose, Note, Table, Vocab
│  └─ exercises/            # MCQ, Fill, Exercise wrapper
├─ pages/                   # HomePage, LessonPage, NotFound
└─ data/
   ├─ lessons/              # one typed data file per lesson (01…12) + index
   └─ studyPlan.ts
```

### How lessons are authored

Lessons are **data, not markup**. Each lesson is a `Lesson` object (`src/data/lessons/`) whose
`blocks` array is a sequence of typed `ContentBlock`s (`heading`, `prose`, `note`, `table`,
`vocab`, `hero`, `exercise`). `ContentRenderer` is the single place that decides how each block
type is displayed. To add or edit content, edit the data file — no component changes needed.

Text fields may contain a small set of trusted inline tags (`<b>`, `<i>`, `<br/>`) rendered via the
`Rich` component. All content is static and authored in-repo; no user input is ever rendered as HTML.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the app and publishes
`dist/` to **GitHub Pages**. The Vite `base` is set to `/french-course/` for production so assets
resolve under the project subpath. Enable Pages once under _Settings → Pages → Source: GitHub
Actions_.
