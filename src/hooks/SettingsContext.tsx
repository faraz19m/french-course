import { createContext, useContext, type ReactNode } from 'react';
import { useSettingsStore, type UseSettings } from './useSettings';

/**
 * Shares a single settings store across the app so the language selector and the
 * translation layer read and write the same base-language value.
 */
const SettingsContext = createContext<UseSettings | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const store = useSettingsStore();
  return <SettingsContext.Provider value={store}>{children}</SettingsContext.Provider>;
}

export function useSettings(): UseSettings {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a <SettingsProvider>');
  }
  return ctx;
}
