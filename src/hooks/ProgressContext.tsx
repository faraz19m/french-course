import { createContext, useContext, type ReactNode } from 'react';
import { useProgressStore, type UseProgress } from './useProgress';

/**
 * Shares a single progress store across the app. Without this, the sidebar and
 * the lesson view would each hold their own copy of the state and drift apart.
 */
const ProgressContext = createContext<UseProgress | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const store = useProgressStore();
  return <ProgressContext.Provider value={store}>{children}</ProgressContext.Provider>;
}

export function useProgress(): UseProgress {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a <ProgressProvider>');
  }
  return ctx;
}
