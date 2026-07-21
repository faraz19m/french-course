import type { Exercise as ExerciseData } from '../../types';
import { useProgress } from '../../hooks/ProgressContext';
import { MCQ } from './MCQ';
import { Fill } from './Fill';

interface ExerciseProps {
  exercise: ExerciseData;
  lessonId: number;
  /** Index of this exercise within the lesson, used to key the saved score. */
  index: number;
}

/**
 * Wraps a single exercise: renders its header (with the learner's best-ever
 * score, if any) and the matching interactive component, and persists each
 * attempt's score to the progress store.
 */
export function Exercise({ exercise, lessonId, index }: ExerciseProps) {
  const { recordScore, bestScore } = useProgress();
  const best = bestScore(lessonId, index);

  const onChecked = (score: number, total: number) => recordScore(lessonId, index, score, total);

  return (
    <div className="ex">
      <div className="ex-head">
        <span className="ex-badge">Exercice</span>
        <span className="ex-title">{exercise.title}</span>
        {best && (
          <span className="ex-best" title="Your best score">
            ★ {best.score}/{best.total}
          </span>
        )}
      </div>
      {exercise.kind === 'mcq' ? (
        <MCQ items={exercise.items} onChecked={onChecked} />
      ) : (
        <Fill items={exercise.items} onChecked={onChecked} />
      )}
    </div>
  );
}
