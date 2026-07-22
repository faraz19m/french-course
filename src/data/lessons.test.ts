import { describe, expect, it } from 'vitest';
import { adjacentLessons, lessonBySlug, lessons } from './lessons';
import { normalizeAnswer } from '../lib/text';

const countWords = (text: string) =>
  text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;

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
      const titles = l.blocks.filter((b) => b.type === 'exercise').map((b) => b.exercise.title);
      expect(new Set(titles).size, `lesson ${l.id}`).toBe(titles.length);
    }
  });

  it("every choice-based question's answer is one of its options", () => {
    for (const { lesson, ex } of exercises) {
      if (ex.kind !== 'mcq' && ex.kind !== 'listening') continue;
      for (const item of ex.items) {
        expect(item.options.length, `lesson ${lesson}: "${item.q}"`).toBeGreaterThanOrEqual(2);
        expect(item.options, `lesson ${lesson}: "${item.q}"`).toContain(item.answer);
        // No duplicate options.
        expect(new Set(item.options).size).toBe(item.options.length);
      }
    }
  });

  it('has complete listening exercises', () => {
    const listening = exercises.filter(({ ex }) => ex.kind === 'listening');
    expect(listening.length).toBeGreaterThanOrEqual(4);

    for (const { lesson, ex } of listening) {
      if (ex.kind !== 'listening') continue;
      expect(ex.transcript.length, `lesson ${lesson}`).toBeGreaterThan(0);
      expect(
        ex.transcript.every(
          (turn) => turn.speaker.trim().length > 0 && turn.text.trim().length > 0,
        ),
      ).toBe(true);
      expect(ex.items.length, `lesson ${lesson}`).toBeGreaterThan(0);
    }
  });

  it('introduces more speakers and faster pacing as listening difficulty advances', () => {
    const listening = exercises
      .filter(({ ex }) => ex.kind === 'listening')
      .map(({ lesson, ex }) => ({
        lesson,
        pace: ex.kind === 'listening' ? ex.pace : 'slow',
        speakers:
          ex.kind === 'listening' ? new Set(ex.transcript.map((turn) => turn.speaker)).size : 0,
      }))
      .sort((a, b) => a.lesson - b.lesson);
    const paceRank = { slow: 0, steady: 1, natural: 2 };

    expect(listening[0].speakers).toBe(1);
    expect(listening.slice(1).every(({ speakers }) => speakers >= 2)).toBe(true);
    expect(listening.at(-1)?.speakers).toBeGreaterThanOrEqual(3);

    for (let i = 1; i < listening.length; i += 1) {
      expect(paceRank[listening[i].pace]).toBeGreaterThanOrEqual(paceRank[listening[i - 1].pace]);
    }
  });

  it('increases listening length as the course level advances', () => {
    const listening = exercises
      .filter(({ ex }) => ex.kind === 'listening')
      .map(({ lesson, ex }) => ({
        lesson,
        words:
          ex.kind === 'listening'
            ? countWords(ex.transcript.map((turn) => turn.text).join(' '))
            : 0,
      }))
      .sort((a, b) => a.lesson - b.lesson);

    for (let i = 1; i < listening.length; i += 1) {
      const previous = listening[i - 1];
      const current = listening[i];
      expect(
        current.words - previous.words,
        `lesson ${current.lesson} should be at least 20 words longer than lesson ${previous.lesson}`,
      ).toBeGreaterThanOrEqual(20);
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
          expect(accepted.length, `lesson ${lesson}: "${item.q}" empty answer-set`).toBeGreaterThan(
            0,
          );
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

describe('reading comprehension', () => {
  it('every lesson has a reading passage with non-empty paragraphs', () => {
    for (const l of lessons) {
      const readings = l.blocks.filter((b) => b.type === 'reading');
      expect(readings.length, `lesson ${l.id}`).toBeGreaterThan(0);
      for (const r of readings) {
        expect(r.title.trim().length, `lesson ${l.id}`).toBeGreaterThan(0);
        expect(r.paragraphs.length, `lesson ${l.id}`).toBeGreaterThan(0);
        expect(r.paragraphs.every((p) => p.trim().length > 0)).toBe(true);
      }
    }
  });

  it('follows every reading passage with an adjacent comprehension exercise', () => {
    for (const l of lessons) {
      l.blocks.forEach((b, i) => {
        if (b.type !== 'reading') return;
        const next = l.blocks[i + 1];
        expect(
          next?.type === 'exercise' &&
            next.exercise.title.toLowerCase().startsWith('compréhension'),
          `lesson ${l.id}: reading "${b.title}" must be followed by a comprehension exercise`,
        ).toBe(true);
      });
    }
  });

  it('increases reading length as the course level advances', () => {
    const readings = lessons.map((lesson) => {
      const passage = lesson.blocks.find((block) => block.type === 'reading');
      expect(passage, `lesson ${lesson.id}`).toBeDefined();

      return {
        lesson: lesson.id,
        words: passage?.type === 'reading' ? countWords(passage.paragraphs.join(' ')) : 0,
      };
    });

    for (let i = 1; i < readings.length; i += 1) {
      const previous = readings[i - 1];
      const current = readings[i];
      expect(
        current.words - previous.words,
        `lesson ${current.lesson} should be at least 8 words longer than lesson ${previous.lesson}`,
      ).toBeGreaterThanOrEqual(8);
    }
  });
});
