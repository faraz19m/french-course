/**
 * The languages a learner can pick as their *base* language — the language they
 * already know and want French translated into (and out of). French itself is
 * intentionally absent: it's the language being learned, not a base choice.
 *
 * Codes are ISO-639-1, matching what the translation providers expect as
 * `sl`/`tl` (see `src/lib/translate.ts`).
 */

export interface Language {
  code: string;
  label: string;
}

export const BASE_LANGUAGES: Language[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'ar', label: 'العربية' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ru', label: 'Русский' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'tr', label: 'Türkçe' },
];

/** The default base language for a new learner. */
export const DEFAULT_BASE_LANGUAGE = 'en';

/** Human-readable label for a language code, falling back to the code itself. */
export function labelFor(code: string): string {
  return BASE_LANGUAGES.find((l) => l.code === code)?.label ?? code;
}
