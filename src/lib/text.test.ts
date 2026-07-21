import { describe, expect, it } from 'vitest';
import { normalizeAnswer } from './text';

describe('normalizeAnswer', () => {
  it('lowercases and trims', () => {
    expect(normalizeAnswer('  Bonjour ')).toBe('bonjour');
  });

  it('strips diacritics so unaccented input matches', () => {
    expect(normalizeAnswer('châteaux')).toBe(normalizeAnswer('chateaux'));
    expect(normalizeAnswer('frère')).toBe('frere');
  });

  it('collapses internal whitespace', () => {
    expect(normalizeAnswer('vingt   et  un')).toBe('vingt et un');
  });

  it('unifies straight and curly apostrophes (mobile smart punctuation)', () => {
    expect(normalizeAnswer('n’a')).toBe(normalizeAnswer("n'a"));
    expect(normalizeAnswer('c’est')).toBe("c'est");
  });

  it('expands œ/æ ligatures so unligatured input matches', () => {
    expect(normalizeAnswer('sœur')).toBe(normalizeAnswer('soeur'));
    expect(normalizeAnswer('cœur')).toBe('coeur');
    expect(normalizeAnswer('nævus')).toBe('naevus');
  });

  it('handles empty input', () => {
    expect(normalizeAnswer('')).toBe('');
  });
});
