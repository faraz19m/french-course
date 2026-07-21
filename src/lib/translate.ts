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

const LS_KEY = 'le-carnet:translations:v1';
const MAX_CACHED = 800;

const memCache = new Map<string, string>();

function cacheKey(text: string, from: string, to: string): string {
  return `${from}|${to}|${text}`;
}

function loadLsCache(): Record<string, string> {
  if (typeof localStorage === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}') as Record<string, string>;
  } catch {
    return {};
  }
}

function persist(key: string, value: string): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const cache = loadLsCache();
    cache[key] = value;
    // Keep the cache bounded: drop the oldest entries once it grows too large.
    const keys = Object.keys(cache);
    if (keys.length > MAX_CACHED) {
      for (const k of keys.slice(0, keys.length - MAX_CACHED)) delete cache[k];
    }
    localStorage.setItem(LS_KEY, JSON.stringify(cache));
  } catch {
    // Storage full/blocked — in-memory cache still works for this session.
  }
}

async function viaGoogle(text: string, from: string, to: string): Promise<string> {
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx' +
    `&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`google ${res.status}`);
  // Shape: [[[translatedChunk, originalChunk, ...], ...], ...]
  const data = (await res.json()) as [Array<[string, string]>, ...unknown[]];
  const segments = data[0];
  if (!Array.isArray(segments)) throw new Error('google: unexpected shape');
  return segments.map((seg) => seg[0]).join('').trim();
}

async function viaMyMemory(text: string, from: string, to: string): Promise<string> {
  const url =
    'https://api.mymemory.translated.net/get' +
    `?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`mymemory ${res.status}`);
  const data = (await res.json()) as { responseData?: { translatedText?: string } };
  const out = data.responseData?.translatedText;
  if (!out) throw new Error('mymemory: empty');
  return out.trim();
}

/**
 * Translates `text` from `from` to `to` (defaults French → English). Throws only
 * if every provider fails; callers should surface a friendly "unavailable" state.
 */
export async function translate(text: string, from = 'fr', to = 'en'): Promise<string> {
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
    result = await viaGoogle(clean, from, to);
  } catch {
    result = await viaMyMemory(clean, from, to);
  }

  memCache.set(key, result);
  persist(key, result);
  return result;
}
