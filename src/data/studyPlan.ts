/** The suggested 60-minute study rhythm, shown on the course overview. */
export interface PlanRow {
  time: string;
  title: string;
  detail: string;
}

export const studyPlan: PlanRow[] = [
  {
    time: '0–5 min',
    title: 'Warm-up',
    detail: "Read the lesson's goals card aloud. Recall last lesson's verbs from memory.",
  },
  {
    time: '5–25 min',
    title: 'New grammar',
    detail: 'Work through the numbered sections (1.1, 1.2…). Say every example sentence out loud.',
  },
  {
    time: '25–40 min',
    title: 'Vocabulary',
    detail:
      'Cover the English column and test yourself on the vocab chips. Write 3 of your own sentences.',
  },
  {
    time: '40–55 min',
    title: 'Exercises',
    detail: "Do every exercise. Aim for full marks; hit 'Try again' on any you miss.",
  },
  {
    time: '55–60 min',
    title: 'Consolidate',
    detail: "Mark the lesson complete. Write down 3 things you'll review tomorrow.",
  },
];
