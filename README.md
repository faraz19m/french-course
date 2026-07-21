# Le Carnet — French A1 Course

A complete, self-paced French **A1** course: 12 one-hour lessons from _"Bonjour"_ to the
_passé composé_, each with reference tables, vocabulary, a **reading-comprehension passage**
with follow-up questions, and interactive self-checking exercises.

Built as a small React + TypeScript single-page app. Progress (completed lessons and best
exercise scores) is saved in the browser, so you can pick up where you left off.

**Inline translation:** in a reading passage, click any word for its English meaning; anywhere in
the app, select a phrase to translate it. Powered by the free Google Translate endpoint (with a
MyMemory fallback), cached locally — no API key required.

## The course

| #   | Lesson              | Grammar focus                              |
| --- | ------------------- | ------------------------------------------ |
| 1   | Bonjour !           | être, pronouns, tu/vous, nationalities     |
| 2   | Les articles        | gender, le/la/les, un/une/des, plurals     |
| 3   | Avoir & l'âge       | avoir, numbers 0–100, il y a               |
| 4   | Verbes en -ER       | regular -ER present tense                  |
| 5   | La négation         | ne…pas, questions, question words          |
| 6   | Les adjectifs       | agreement, position, colours, c'est/il est |
| 7   | Verbes -IR / -RE    | finir, vendre, aller, faire, futur proche  |
| 8   | L'heure & les jours | time, dates, seasons, weather, routines    |
| 9   | Au restaurant       | partitives du/de la/des, food, ordering    |
| 10  | La famille          | family, possessives mon/ma/mes             |
| 11  | En ville            | places, à/de contractions, directions      |
| 12  | Le passé composé    | past tense with avoir & être               |

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # type-check + production build into dist/
npm run preview # preview the production build locally
```

### Quality checks

The same checks CI enforces can all be run locally:

```bash
npm run typecheck    # tsc, no emit
npm run lint         # ESLint
npm run format       # Prettier — write (fix formatting)
npm run format:check # Prettier — verify only (what CI runs)
npm test             # Vitest unit tests (one-shot)
npm run test:watch   # Vitest in watch mode
npm run test:coverage
```

Unit tests live next to the code they cover as `*.test.ts(x)` files and run under
[Vitest](https://vitest.dev/) (jsdom environment). They cover answer normalisation, the
localStorage helpers, the translation layer (network mocked), the progress store, and the
integrity of the course data.

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

## Continuous integration

`.github/workflows/ci.yml` runs on **every pull request** (and every commit pushed to a PR
branch) and on pushes to `master`. It runs five independent jobs in parallel — `typecheck`,
`lint`, `format`, `test`, and `build` — so a failing PR shows exactly which gate broke.
`master` is protected so **all five** must pass before a PR can be merged; a red build blocks
the merge button.

## Deployment

The live site tracks **version tags**, not the tip of `master`:

- **Push to `master` / open a PR** → `.github/workflows/ci.yml` runs the full check suite. Nothing is published.
- **Push a tag `v*`** (e.g. `git tag v1.0.0 && git push origin v1.0.0`) → `.github/workflows/deploy.yml` re-runs the checks, builds, and publishes `dist/` to **GitHub Pages**.

So the site changes only when you cut a release, and merging PRs never affects what's live. As a safety net, the `github-pages` environment is locked to `v*` tags, so nothing else (not even a manual run from `master`) can publish.

The Vite `base` is `/french-course/` so assets resolve under the project subpath. Pages source is set to **GitHub Actions** (_Settings → Pages → Source_).
