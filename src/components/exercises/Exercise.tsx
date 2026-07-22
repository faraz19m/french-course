import type { Exercise as ExerciseData } from '../../types';
import { useProgress } from '../../hooks/ProgressContext';
import { MCQ } from './MCQ';
import { Fill } from './Fill';
import { Listening } from './Listening';

interface ExerciseProps {
  exercise: ExerciseData;
  lessonId: number;
}

/**
 * Wraps a single exercise: renders its header (with the learner's best-ever
 * score, if any) and the matching interactive component, and persists each
 * attempt's score to the progress store.
 *
 * Scores are keyed by the exercise title, which is unique within a lesson
 * (enforced by the data tests). That identity travels with the content, so
 * reordering or inserting exercises never reassigns a saved score.
 */
export function Exercise({ exercise, lessonId }: ExerciseProps) {
  const { recordScore, bestScore } = useProgress();
  const best = bestScore(lessonId, exercise.title);

  const onChecked = (score: number, total: number) =>
    recordScore(lessonId, exercise.title, score, total);

  const content = (() => {
    switch (exercise.kind) {
      case 'mcq':
        return <MCQ items={exercise.items} onChecked={onChecked} />;
      case 'fill':
        return <Fill items={exercise.items} onChecked={onChecked} />;
      case 'listening':
        return (
          <Listening
            transcript={exercise.transcript}
            items={exercise.items}
            onChecked={onChecked}
          />
        );
      default: {
        const _never: never = exercise;
        return _never;
      }
    }
  })();

  return (
    <div className="ex">
      <div className="ex-head">
        <span className="ex-badge">{exercise.kind === 'listening' ? 'Écoute' : 'Exercice'}</span>
        <span className="ex-title">{exercise.title}</span>
        {best && (
          <span className="ex-best" title="Your best score">
            ★ {best.score}/{best.total}
          </span>
        )}
      </div>
      {content}
    </div>
  );
}
