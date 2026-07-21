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

  it('handles empty input', () => {
    expect(normalizeAnswer('')).toBe('');
  });
});
