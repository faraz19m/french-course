import { afterEach, describe, expect, it, vi } from 'vitest';
import { smartTranslate, translate } from './translate';

// The module keeps a process-wide in-memory cache we can't reset between tests,
// so every test translates a UNIQUE phrase to avoid cross-test cache hits.
let n = 0;
const unique = () => `phrase-${n++}`;

function googleOk(text: string): Response {
  return {
    ok: true,
    status: 200,
    json: async () => [[[text, 'orig']]],
  } as unknown as Response;
}

// Like googleOk but carries a detected source language at index 2, as the real
// gtx endpoint does — what `smartTranslate` reads to pick a direction.
function googleDetect(text: string, detected: string): Response {
  return {
    ok: true,
    status: 200,
    json: async () => [[[text, 'orig']], null, detected],
  } as unknown as Response;
}

function myMemoryOk(text: string, status: number | string = 200): Response {
  return {
    ok: true,
    status: 200,
    json: async () => ({ responseStatus: status, responseData: { translatedText: text } }),
  } as unknown as Response;
}

function httpError(status = 500): Response {
  return { ok: false, status, json: async () => ({}) } as unknown as Response;
}

describe('translate', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns "" for blank input without calling fetch', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    expect(await translate('   ')).toBe('');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns the Google translation on success', async () => {
    const q = unique();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(googleOk('hello'));
    expect(await translate(q)).toBe('hello');
  });

  it('caches results in memory so a repeat lookup skips the network', async () => {
    const q = unique();
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(googleOk('bonjour'));
    await translate(q);
    await translate(q);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('falls back to MyMemory when Google errors', async () => {
    const q = unique();
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(httpError(429))
      .mockResolvedValueOnce(myMemoryOk('fallback-result'));
    expect(await translate(q)).toBe('fallback-result');
  });

  it('rejects a MyMemory quota reply (200 body, non-200 responseStatus)', async () => {
    const q = unique();
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(httpError(500)) // Google fails → try MyMemory
      .mockResolvedValueOnce(myMemoryOk('YOU USED ALL AVAILABLE FREE TRANSLATIONS', 429));
    await expect(translate(q)).rejects.toThrow();
  });

  it('throws when every provider fails', async () => {
    const q = unique();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(httpError(503));
    await expect(translate(q)).rejects.toThrow();
  });

  it('persists a successful translation to localStorage', async () => {
    const q = unique();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(googleOk('persisted'));
    await translate(q);
    const raw = localStorage.getItem('le-carnet:translations:v1');
    expect(raw).toContain('persisted');
  });
});

describe('smartTranslate', () => {
  afterEach(() => vi.restoreAllMocks());

  it('translates foreign text into the base language in one request', async () => {
    const q = unique();
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(googleDetect('hello', 'fr'));
    const out = await smartTranslate(q, { base: 'en' });
    expect(out).toEqual({ result: 'hello', from: 'fr', to: 'en' });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('respects a non-English base language (fr → es)', async () => {
    const q = unique();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(googleDetect('hola', 'fr'));
    const out = await smartTranslate(q, { base: 'es' });
    expect(out).toEqual({ result: 'hola', from: 'fr', to: 'es' });
  });

  it('flips direction when the text is already in the base language (en → fr)', async () => {
    const q = unique();
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(googleDetect(q, 'en')) // auto-detect: it's English
      .mockResolvedValueOnce(googleOk('bonjour')); // second request: en → fr
    const out = await smartTranslate(q, { base: 'en' });
    expect(out).toEqual({ result: 'bonjour', from: 'en', to: 'fr' });
  });

  it('falls back to assuming French when auto-detect fails', async () => {
    const q = unique();
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(httpError(500)) // auto-detect request fails
      .mockResolvedValueOnce(googleOk('rescued')); // fallback fr → base
    const out = await smartTranslate(q, { base: 'en' });
    expect(out).toEqual({ result: 'rescued', from: 'fr', to: 'en' });
  });
});
