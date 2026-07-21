import { useCallback, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '../lib/storage';
import { DEFAULT_BASE_LANGUAGE } from '../lib/languages';

/**
 * Learner-facing app settings, persisted to localStorage so they survive
 * reloads (same best-effort persistence as `useProgress`).
 *
 * Currently just the *base language* — the language the learner already knows.
 * Translations flow between French (the language being learned, fixed) and this
 * base language; see `smartTranslate` in `src/lib/translate.ts`.
 */

const STORAGE_KEY = 'le-carnet:settings:v1';

export interface SettingsState {
  baseLanguage: string;
}

function load(): SettingsState {
  const parsed = readJSON<Partial<SettingsState>>(STORAGE_KEY, {});
  return {
    baseLanguage: parsed.baseLanguage ?? DEFAULT_BASE_LANGUAGE,
  };
}

export interface UseSettings {
  state: SettingsState;
  baseLanguage: string;
  setBaseLanguage: (code: string) => void;
}

/**
 * Builds the settings store. Call this exactly once (in `SettingsProvider`);
 * everything else consumes the shared instance via `useSettings()`.
 */
export function useSettingsStore(): UseSettings {
  const [state, setState] = useState<SettingsState>(load);

  // Persist on every change (best-effort — no-ops if storage is unavailable).
  useEffect(() => {
    writeJSON(STORAGE_KEY, state);
  }, [state]);

  const setBaseLanguage = useCallback((code: string) => {
    setState((prev) => ({ ...prev, baseLanguage: code }));
  }, []);

  return { state, baseLanguage: state.baseLanguage, setBaseLanguage };
}
