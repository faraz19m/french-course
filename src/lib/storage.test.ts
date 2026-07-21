import { afterEach, describe, expect, it, vi } from 'vitest';
import { readJSON, writeJSON } from './storage';

describe('readJSON', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns the fallback when the key is missing', () => {
    expect(readJSON('missing', { a: 1 })).toEqual({ a: 1 });
  });

  it('round-trips a value written with writeJSON', () => {
    writeJSON('k', { hello: 'world', n: 3 });
    expect(readJSON('k', null)).toEqual({ hello: 'world', n: 3 });
  });

  it('returns the fallback when stored JSON is corrupt', () => {
    localStorage.setItem('bad', '{not valid json');
    expect(readJSON('bad', 'fallback')).toBe('fallback');
  });

  it('preserves falsy stored values instead of using the fallback', () => {
    writeJSON('zero', 0);
    expect(readJSON('zero', 99)).toBe(0);
    writeJSON('false', false);
    expect(readJSON('false', true)).toBe(false);
  });

  it('returns the fallback if getItem throws (blocked storage)', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(readJSON('x', 'fb')).toBe('fb');
  });
});

describe('writeJSON', () => {
  afterEach(() => vi.restoreAllMocks());

  it('serialises objects to storage', () => {
    writeJSON('obj', [1, 2, 3]);
    expect(localStorage.getItem('obj')).toBe('[1,2,3]');
  });

  it('never throws when setItem fails (quota exceeded)', () => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => writeJSON('x', { big: 'value' })).not.toThrow();
  });
});
