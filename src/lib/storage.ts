/**
 * Safe localStorage JSON helpers shared across the app.
 *
 * Both guard the two failure modes every localStorage caller has to handle:
 *  - no `localStorage` at all (SSR / non-browser), and
 *  - corrupt, unreadable, full, or blocked storage (e.g. private mode).
 * Callers get a fallback instead of a crash, so persistence is always best-effort.
 */

/** Read and JSON-parse `key`, returning `fallback` if it's missing or unreadable. */
export function readJSON<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** JSON-stringify and write `value` to `key`; silently no-ops if storage is unavailable. */
export function writeJSON(key: string, value: unknown): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked — the caller continues without persistence.
  }
}
