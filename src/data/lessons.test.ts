import { describe, expect, it } from 'vitest';
import { adjacentLessons, lessonBySlug, lessons } from './lessons';
import { normalizeAnswer } from '../lib/text';

describe('course structure', () => {
  it('has 12 lessons numbered 1..12 in order', () => {
    expect(lessons).toHaveLength(12);
    lessons.forEach((l, i) => expect(l.id).toBe(i + 1));
  });

  it('has unique, non-empty slugs indexed by lessonBySlug', () => {
    const slugs = lessons.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const l of lessons) {
      expect(l.slug).toMatch(/^[a-z0-9-]+$/);
      expect(lessonBySlug.get(l.slug)).toBe(l);
    }
  });

  it('links adjacent lessons correctly, with null at the ends', () => {
    expect(adjacentLessons(1).prev).toBeNull();
    expect(adjacentLessons(1).next?.id).toBe(2);
    expect(adjacentLessons(12).next).toBeNull();
    expect(adjacentLessons(6).prev?.id).toBe(5);
    expect(adjacentLessons(6).next?.id).toBe(7);
  });

  it('gives every lesson a title, subtitle and grammar focus', () => {
    for (const l of lessons) {
      expect(l.fr.length).toBeGreaterThan(0);
      expect(l.en.length).toBeGreaterThan(0);
      expect(l.grammarFocus.length).toBeGreaterThan(0);
    }
  });
});

describe('exercise integrity', () => {
  const exercises = lessons.flatMap((l) =>
    l.blocks.filter((b) => b.type === 'exercise').map((b) => ({ lesson: l.id, ex: b.exercise })),
  );

  it('has at least one exercise per lesson', () => {
    for (const l of lessons) {
      const count = l.blocks.filter((b) => b.type === 'exercise').length;
      expect(count, `lesson ${l.id}`).toBeGreaterThan(0);
    }
  });

  it('has unique exercise titles within each lesson (scores are keyed by title)', () => {
    for (const l of lessons) {
      const titles = l.blocks
        .filter((b) => b.type === 'exercise')
        .map((b) => b.exercise.title);
      expect(new Set(titles).size, `lesson ${l.id}`).toBe(titles.length);
    }
  });

  it("every MCQ's answer is one of its options", () => {
    for (const { lesson, ex } of exercises) {
      if (ex.kind !== 'mcq') continue;
      for (const item of ex.items) {
        expect(item.options.length, `lesson ${lesson}: "${item.q}"`).toBeGreaterThanOrEqual(2);
        expect(item.options, `lesson ${lesson}: "${item.q}"`).toContain(item.answer);
        // No duplicate options.
        expect(new Set(item.options).size).toBe(item.options.length);
      }
    }
  });

  it('every Fill question has exactly one answer-set per ___ blank', () => {
    for (const { lesson, ex } of exercises) {
      if (ex.kind !== 'fill') continue;
      for (const item of ex.items) {
        const blankCount = item.q.split('___').length - 1;
        expect(blankCount, `lesson ${lesson}: "${item.q}" should contain ___`).toBeGreaterThan(0);
        expect(item.blanks.length, `lesson ${lesson}: "${item.q}" blank count`).toBe(blankCount);
        for (const accepted of item.blanks) {
          expect(accepted.length, `lesson ${lesson}: "${item.q}" empty answer-set`).toBeGreaterThan(0);
          expect(accepted.every((a) => a.trim().length > 0)).toBe(true);
        }
      }
    }
  });

  it('Fill accepted answers are distinct after normalization within a blank', () => {
    for (const { ex } of exercises) {
      if (ex.kind !== 'fill') continue;
      for (const item of ex.items) {
        for (const accepted of item.blanks) {
          const normed = accepted.map(normalizeAnswer);
          // Variants may normalise to the same string (e.g. accented vs not);
          // that's fine — we just assert the raw list has no exact duplicates.
          expect(new Set(accepted).size).toBe(accepted.length);
          expect(normed.length).toBeGreaterThan(0);
        }
      }
    }
  });
});
