import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { translate } from '../lib/translate';
import { TranslationPopover, type TranslationStatus } from '../components/TranslationPopover';

interface TranslationContextValue {
  /** Look up `text` and show the result anchored to `anchor` (a viewport rect). */
  translateAt: (text: string, anchor: DOMRect) => void;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

interface PopoverState {
  source: string;
  anchor: DOMRect;
  status: TranslationStatus;
  result: string;
}

/** Longest selection we'll auto-translate — avoids firing on stray whole-page selects. */
const MAX_SELECTION = 240;

/**
 * Provides on-demand translation across the app:
 *  - `translateAt` powers click-to-translate (used by reading passages).
 *  - a global selection listener powers select-to-translate for any phrase.
 * A single popover is rendered for whichever was triggered last.
 */
export function TranslationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PopoverState | null>(null);
  // Guards against a slow request overwriting a newer one.
  const requestId = useRef(0);

  const translateAt = useCallback((text: string, anchor: DOMRect) => {
    const clean = text.trim();
    if (!clean) return;
    const id = ++requestId.current;
    setState({ source: clean, anchor, status: 'loading', result: '' });
    translate(clean)
      .then((result) => {
        if (requestId.current === id) {
          setState((s) => (s ? { ...s, status: 'done', result } : s));
        }
      })
      .catch(() => {
        if (requestId.current === id) {
          setState((s) => (s ? { ...s, status: 'error', result: '' } : s));
        }
      });
  }, []);

  const close = useCallback(() => {
    requestId.current++; // invalidate any in-flight request
    setState(null);
  }, []);

  // Select-to-translate: on any completed selection, translate it.
  useEffect(() => {
    const onMouseUp = (e: MouseEvent) => {
      // Ignore selections that start inside the popover itself.
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest('.tpop')) return;

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

      const text = selection.toString().trim();
      if (!text || text.length > MAX_SELECTION) return;

      const rect = selection.getRangeAt(0).getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      translateAt(text, rect);
    };
    document.addEventListener('mouseup', onMouseUp);
    return () => document.removeEventListener('mouseup', onMouseUp);
  }, [translateAt]);

  return (
    <TranslationContext.Provider value={{ translateAt }}>
      {children}
      {state && (
        <TranslationPopover
          source={state.source}
          anchor={state.anchor}
          status={state.status}
          result={state.result}
          onClose={close}
        />
      )}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextValue {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error('useTranslation must be used within a <TranslationProvider>');
  return ctx;
}
