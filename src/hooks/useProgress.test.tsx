import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { exerciseKey, useProgressStore } from './useProgress';

describe('exerciseKey', () => {
  it('joins lesson id and exercise title with a colon', () => {
    expect(exerciseKey(3, 'Les articles')).toBe('3:Les articles');
  });
});

describe('useProgressStore', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useProgressStore());
    expect(result.current.completedCount).toBe(0);
    expect(result.current.isDone(1)).toBe(false);
  });

  it('toggles lesson completion and tracks the count', () => {
    const { result } = renderHook(() => useProgressStore());

    act(() => result.current.toggleDone(1));
    expect(result.current.isDone(1)).toBe(true);
    expect(result.current.completedCount).toBe(1);

    act(() => result.current.toggleDone(1));
    expect(result.current.isDone(1)).toBe(false);
    expect(result.current.completedCount).toBe(0);
  });

  it('records a score and reads it back', () => {
    const { result } = renderHook(() => useProgressStore());
    act(() => result.current.recordScore(2, 'Quiz', 3, 5));
    expect(result.current.bestScore(2, 'Quiz')).toEqual({ score: 3, total: 5 });
  });

  it('keeps only the best score by fraction correct', () => {
    const { result } = renderHook(() => useProgressStore());

    act(() => result.current.recordScore(1, 'Q', 4, 5)); // 0.8
    act(() => result.current.recordScore(1, 'Q', 2, 5)); // 0.4 — worse, ignored
    expect(result.current.bestScore(1, 'Q')).toEqual({ score: 4, total: 5 });

    act(() => result.current.recordScore(1, 'Q', 5, 5)); // 1.0 — better, kept
    expect(result.current.bestScore(1, 'Q')).toEqual({ score: 5, total: 5 });
  });

  it('accepts an improved fraction even when the item count changed', () => {
    const { result } = renderHook(() => useProgressStore());
    act(() => result.current.recordScore(1, 'Q', 3, 5)); // 0.6 of an old 5-item set
    act(() => result.current.recordScore(1, 'Q', 4, 4)); // 1.0 of a new 4-item set — better
    expect(result.current.bestScore(1, 'Q')).toEqual({ score: 4, total: 4 });
  });

  it('keeps the existing score when a new attempt ties on fraction', () => {
    const { result } = renderHook(() => useProgressStore());
    act(() => result.current.recordScore(1, 'Q', 5, 5)); // 1.0
    act(() => result.current.recordScore(1, 'Q', 4, 4)); // also 1.0 — a tie, not an improvement
    expect(result.current.bestScore(1, 'Q')).toEqual({ score: 5, total: 5 });
  });

  it('reset clears all progress', () => {
    const { result } = renderHook(() => useProgressStore());
    act(() => {
      result.current.toggleDone(1);
      result.current.recordScore(1, 'Q', 5, 5);
    });
    act(() => result.current.reset());
    expect(result.current.completedCount).toBe(0);
    expect(result.current.bestScore(1, 'Q')).toBeUndefined();
  });

  it('persists progress to localStorage across store instances', () => {
    const first = renderHook(() => useProgressStore());
    act(() => first.result.current.toggleDone(4));

    // A fresh store (e.g. after reload) should hydrate from localStorage.
    const second = renderHook(() => useProgressStore());
    expect(second.result.current.isDone(4)).toBe(true);
  });
});
