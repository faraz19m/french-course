/**
 * On-demand translation for the learner: click a word or select a phrase and
 * get its English meaning.
 *
 * Providers are all free and require no API key:
 *  1. Google Translate's public `gtx` endpoint (same results as translate.google.com).
 *  2. MyMemory as a fallback if Google errors or rate-limits.
 * Both send `Access-Control-Allow-Origin: *`, so they work directly from the browser.
 *
 * Results are cached in memory and in localStorage so repeat lookups are instant
 * and we stay well under any rate limit.
 */

import { readJSON, writeJSON } from './storage';

const LS_KEY = 'le-carnet:translations:v1';
const MAX_CACHED = 800;
/** Fail a stalled request rather than leave the popover spinning forever. */
const REQUEST_TIMEOUT_MS = 8000;

const memCache = new Map<string, string>();

function cacheKey(text: string, from: string, to: string): string {
  return `${from}|${to}|${text}`;
}

function loadLsCache(): Record<string, string> {
  return readJSON<Record<string, string>>(LS_KEY, {});
}

function persist(key: string, value: string): void {
  // Re-read the freshest cache so concurrent lookups don't clobber each other.
  const cache = loadLsCache();
  cache[key] = value;
  // Keep the cache bounded: once it overflows, drop entries in insertion order
  // (first-written first — not true LRU, but enough to cap localStorage growth).
  const keys = Object.keys(cache);
  if (keys.length > MAX_CACHED) {
    for (const k of keys.slice(0, keys.length - MAX_CACHED)) delete cache[k];
  }
  writeJSON(LS_KEY, cache);
}

/** fetch() with a hard timeout, honouring an optional caller abort signal. */
async function fetchWithTimeout(url: string, signal?: AbortSignal): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  const onAbort = () => ctrl.abort();
  if (signal) {
    if (signal.aborted) ctrl.abort();
    else signal.addEventListener('abort', onAbort);
  }
  try {
    return await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}

/**
 * Calls Google's `gtx` endpoint and returns both the translation and the source
 * language it detected. Pass `from='auto'` to let Google detect the source.
 * Shape: `[[[translatedChunk, originalChunk, ...], ...], null, detectedLang, ...]`.
 */
async function viaGoogleDetect(
  text: string,
  from: string,
  to: string,
  signal?: AbortSignal,
): Promise<{ result: string; detected: string }> {
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx' +
    `&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetchWithTimeout(url, signal);
  if (!res.ok) throw new Error(`google ${res.status}`);
  const data = (await res.json()) as [Array<[string, string]>, unknown, unknown, ...unknown[]];
  const segments = data[0];
  if (!Array.isArray(segments)) throw new Error('google: unexpected shape');
  // Any malformed segment means we don't trust the response — throw so we fall
  // back to MyMemory rather than silently join a truncated translation.
  const parts: string[] = [];
  for (const seg of segments) {
    if (!Array.isArray(seg) || typeof seg[0] !== 'string') throw new Error('google: bad segment');
    parts.push(seg[0]);
  }
  const out = parts.join('').trim();
  if (!out) throw new Error('google: empty');
  // data[2] is the detected source language (e.g. "fr"). Fall back to the
  // requested `from` when it's absent so callers always get a usable code.
  const detected = typeof data[2] === 'string' && data[2] ? data[2] : from;
  return { result: out, detected };
}

async function viaGoogle(
  text: string,
  from: string,
  to: string,
  signal?: AbortSignal,
): Promise<string> {
  return (await viaGoogleDetect(text, from, to, signal)).result;
}

async function viaMyMemory(
  text: string,
  from: string,
  to: string,
  signal?: AbortSignal,
): Promise<string> {
  const url =
    'https://api.mymemory.translated.net/get' +
    `?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
  const res = await fetchWithTimeout(url, signal);
  if (!res.ok) throw new Error(`mymemory ${res.status}`);
  const data = (await res.json()) as {
    responseStatus?: number | string;
    responseData?: { translatedText?: string };
  };
  // On quota/error MyMemory replies HTTP 200 but puts a warning string in
  // translatedText and a non-200 responseStatus — reject those so the warning
  // never gets shown or cached as if it were a translation.
  const status = Number(data.responseStatus);
  if (status && status !== 200) throw new Error(`mymemory status ${status}`);
  const out = data.responseData?.translatedText?.trim();
  if (!out) throw new Error('mymemory: empty');
  return out;
}

interface TranslateOptions {
  from?: string;
  to?: string;
  /** Aborts the in-flight request (e.g. when the popover closes). */
  signal?: AbortSignal;
}

/**
 * Translates `text` (defaults French → English). Throws if every provider fails
 * or the request is aborted; callers should surface a friendly "unavailable"
 * state. Only non-empty results are cached, so a transient blank never sticks.
 */
export async function translate(text: string, opts: TranslateOptions = {}): Promise<string> {
  const { from = 'fr', to = 'en', signal } = opts;
  const clean = text.trim();
  if (!clean) return '';

  const key = cacheKey(clean, from, to);
  const cached = memCache.get(key);
  if (cached !== undefined) return cached;

  const ls = loadLsCache();
  if (ls[key] !== undefined) {
    memCache.set(key, ls[key]);
    return ls[key];
  }

  let result: string;
  try {
    result = await viaGoogle(clean, from, to, signal);
  } catch {
    result = await viaMyMemory(clean, from, to, signal);
  }

  if (result) {
    memCache.set(key, result);
    persist(key, result);
  }
  return result;
}

/** The language being learned. Fixed — the base language is what varies. */
const LEARNING = 'fr';

/**
 * Direction we've already resolved for a given source text this session, so a
 * repeat lookup skips re-detecting and goes straight to the (cached) translate.
 */
const resolvedCache = new Map<string, { from: string; to: string }>();

export interface SmartTranslation {
  result: string;
  from: string;
  to: string;
}

/**
 * Auto-directional translation for the learner. The rule: translate into your
 * `base` language, unless the text already *is* your base language — then
 * translate it into French. So highlighting French shows it in your language,
 * and highlighting your own language shows the French.
 *
 * The common path (French → base) resolves in a single Google request via
 * source auto-detection; base → French costs one extra request the first time.
 */
export async function smartTranslate(
  text: string,
  opts: { base: string; signal?: AbortSignal },
): Promise<SmartTranslation> {
  const { base, signal } = opts;
  const clean = text.trim();
  if (!clean) return { result: '', from: LEARNING, to: base };

  // Already resolved this text's direction — let translate()'s cache serve it.
  const known = resolvedCache.get(clean);
  if (known) {
    const result = await translate(clean, { ...known, signal });
    return { ...known, result };
  }

  try {
    // One shot: auto-detect the source and translate into the base language.
    const { result, detected } = await viaGoogleDetect(clean, 'auto', base, signal);
    if (detected !== base) {
      // Foreign text (French or otherwise): "→ base" is what we want. Seed the
      // shared cache under the resolved pair so repeats are instant.
      const key = cacheKey(clean, detected, base);
      memCache.set(key, result);
      persist(key, result);
      resolvedCache.set(clean, { from: detected, to: base });
      return { result, from: detected, to: base };
    }
    // The text is already in the base language → translate it into French.
    const learned = await translate(clean, { from: base, to: LEARNING, signal });
    resolvedCache.set(clean, { from: base, to: LEARNING });
    return { result: learned, from: base, to: LEARNING };
  } catch {
    // Auto-detect failed: assume the dominant case (French source) and go
    // through the full provider fallback chain. Re-throws on a real failure.
    const result = await translate(clean, { from: LEARNING, to: base, signal });
    resolvedCache.set(clean, { from: LEARNING, to: base });
    return { result, from: LEARNING, to: base };
  }
}
