import type { Lesson } from '../../types';
import { lesson01 } from './01-bonjour';
import { lesson02 } from './02-articles';
import { lesson03 } from './03-avoir-age';
import { lesson04 } from './04-verbes-er';
import { lesson05 } from './05-negation';
import { lesson06 } from './06-adjectifs';
import { lesson07 } from './07-verbes-ir-re';
import { lesson08 } from './08-heure-jours';
import { lesson09 } from './09-restaurant';
import { lesson10 } from './10-famille';
import { lesson11 } from './11-en-ville';
import { lesson12 } from './12-passe-compose';

/** The full course, in study order. */
export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
  lesson10,
  lesson11,
  lesson12,
];

/** Fast lookup for routing (/#/lesson/:slug). */
export const lessonBySlug: Map<string, Lesson> = new Map(lessons.map((l) => [l.slug, l]));

/** Returns the lesson before/after a given one, or null at the ends. */
export function adjacentLessons(id: number): { prev: Lesson | null; next: Lesson | null } {
  const i = lessons.findIndex((l) => l.id === id);
  return {
    prev: i > 0 ? lessons[i - 1] : null,
    next: i >= 0 && i < lessons.length - 1 ? lessons[i + 1] : null,
  };
}
