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

async function viaGoogle(text: string, from: string, to: string, signal?: AbortSignal): Promise<string> {
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx' +
    `&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetchWithTimeout(url, signal);
  if (!res.ok) throw new Error(`google ${res.status}`);
  // Shape: [[[translatedChunk, originalChunk, ...], ...], ...]
  const data = (await res.json()) as [Array<[string, string]>, ...unknown[]];
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
  return out;
}

async function viaMyMemory(text: string, from: string, to: string, signal?: AbortSignal): Promise<string> {
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
