import { useCallback, useEffect, useState } from 'react';

/**
 * Learner progress, persisted to localStorage so it survives page reloads and
 * browser sessions (the original prototype lost everything on refresh).
 *
 * Two things are tracked:
 *  - `completed`: which lessons the learner marked done (the progress spine).
 *  - `scores`:    the best score achieved on each exercise, keyed by
 *                 `"<lessonId>:<exerciseIndex>"`.
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
  if (typeof localStorage === 'undefined') return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completed: parsed.completed ?? {},
      scores: parsed.scores ?? {},
    };
  } catch {
    // Corrupt or unreadable storage — start fresh rather than crash.
    return EMPTY;
  }
}

export function exerciseKey(lessonId: number, exerciseIndex: number): string {
  return `${lessonId}:${exerciseIndex}`;
}

export interface UseProgress {
  state: ProgressState;
  isDone: (lessonId: number) => boolean;
  toggleDone: (lessonId: number) => void;
  completedCount: number;
  /** Records a score, keeping only the learner's best attempt. */
  recordScore: (lessonId: number, exerciseIndex: number, score: number, total: number) => void;
  bestScore: (lessonId: number, exerciseIndex: number) => ExerciseScore | undefined;
  reset: () => void;
}

/**
 * Builds the progress store. Call this exactly once (in `ProgressProvider`);
 * everything else consumes the shared instance via `useProgress()` so all
 * views stay in sync.
 */
export function useProgressStore(): UseProgress {
  const [state, setState] = useState<ProgressState>(load);

  // Persist on every change.
  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked (e.g. private mode) — progress simply won't
      // persist this session; not worth interrupting the learner over.
    }
  }, [state]);

  const isDone = useCallback((lessonId: number) => Boolean(state.completed[lessonId]), [state]);

  const toggleDone = useCallback((lessonId: number) => {
    setState((prev) => ({
      ...prev,
      completed: { ...prev.completed, [lessonId]: !prev.completed[lessonId] },
    }));
  }, []);

  const recordScore = useCallback(
    (lessonId: number, exerciseIndex: number, score: number, total: number) => {
      const key = exerciseKey(lessonId, exerciseIndex);
      setState((prev) => {
        const existing = prev.scores[key];
        // Keep the best attempt (higher score, or same score first recorded).
        if (existing && existing.score >= score) return prev;
        return { ...prev, scores: { ...prev.scores, [key]: { score, total } } };
      });
    },
    [],
  );

  const bestScore = useCallback(
    (lessonId: number, exerciseIndex: number): ExerciseScore | undefined =>
      state.scores[exerciseKey(lessonId, exerciseIndex)],
    [state],
  );

  const reset = useCallback(() => setState(EMPTY), []);

  const completedCount = Object.values(state.completed).filter(Boolean).length;

  return { state, isDone, toggleDone, completedCount, recordScore, bestScore, reset };
}
