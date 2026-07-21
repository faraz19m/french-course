import { useCallback, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '../lib/storage';

/**
 * Learner progress, persisted to localStorage so it survives page reloads and
 * browser sessions (the original prototype lost everything on refresh).
 *
 * Two things are tracked:
 *  - `completed`: which lessons the learner marked done (the progress spine).
 *  - `scores`:    the best score achieved on each exercise, keyed by
 *                 `"<lessonId>:<exercise title>"` — a stable identity that
 *                 survives reordering exercises within a lesson.
 */

const STORAGE_KEY = 'le-carnet:progress:v1';

export interface ExerciseScore {
  score: number;
  total: number;
}

export interface ProgressState {
  completed: Record<number, boolean>;
  scores: Record<string, ExerciseScore>;
}

const EMPTY: ProgressState = { completed: {}, scores: {} };

function load(): ProgressState {
  const parsed = readJSON<Partial<ProgressState>>(STORAGE_KEY, {});
  return {
    completed: parsed.completed ?? {},
    scores: parsed.scores ?? {},
  };
}

export function exerciseKey(lessonId: number, exerciseId: string): string {
  return `${lessonId}:${exerciseId}`;
}

export interface UseProgress {
  state: ProgressState;
  isDone: (lessonId: number) => boolean;
  toggleDone: (lessonId: number) => void;
  completedCount: number;
  /** Records a score, keeping only the learner's best attempt. */
  recordScore: (lessonId: number, exerciseId: string, score: number, total: number) => void;
  bestScore: (lessonId: number, exerciseId: string) => ExerciseScore | undefined;
  reset: () => void;
}

/**
 * Builds the progress store. Call this exactly once (in `ProgressProvider`);
 * everything else consumes the shared instance via `useProgress()` so all
 * views stay in sync.
 */
export function useProgressStore(): UseProgress {
  const [state, setState] = useState<ProgressState>(load);

  // Persist on every change. Best-effort: if storage is full or blocked (e.g.
  // private mode) progress simply won't persist this session.
  useEffect(() => {
    writeJSON(STORAGE_KEY, state);
  }, [state]);

  const isDone = useCallback(
    (lessonId: number) => Boolean(state.completed[lessonId]),
    [state.completed],
  );

  const toggleDone = useCallback((lessonId: number) => {
    setState((prev) => ({
      ...prev,
      completed: { ...prev.completed, [lessonId]: !prev.completed[lessonId] },
    }));
  }, []);

  const recordScore = useCallback(
    (lessonId: number, exerciseId: string, score: number, total: number) => {
      const key = exerciseKey(lessonId, exerciseId);
      setState((prev) => {
        const existing = prev.scores[key];
        // Keep the best attempt by *fraction* correct. Comparing raw scores would
        // wrongly reject a genuine improvement when an exercise's item count
        // changed between versions (e.g. a stored 5/5 blocking a new 4/4).
        // Cross-multiplied to avoid a divide-by-zero on a hypothetical 0-item set.
        if (existing && existing.score * total >= score * existing.total) return prev;
        return { ...prev, scores: { ...prev.scores, [key]: { score, total } } };
      });
    },
    [],
  );

  const bestScore = useCallback(
    (lessonId: number, exerciseId: string): ExerciseScore | undefined =>
      state.scores[exerciseKey(lessonId, exerciseId)],
    [state.scores],
  );

  const reset = useCallback(() => setState(EMPTY), []);

  const completedCount = Object.values(state.completed).filter(Boolean).length;

  return { state, isDone, toggleDone, completedCount, recordScore, bestScore, reset };
}
