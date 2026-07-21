import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type TranslationStatus = 'loading' | 'done' | 'error';

interface TranslationPopoverProps {
  /** The French source text being looked up. */
  source: string;
  /** Viewport-relative rectangle of the clicked word / selected text. */
  anchor: DOMRect;
  status: TranslationStatus;
  result: string;
  onClose: () => void;
}

const WIDTH = 280;

/**
 * A small floating card showing a word/phrase and its English translation,
 * anchored to whatever the learner clicked or selected. Rendered in a portal so
 * it's never clipped by lesson content, and dismissed on outside click, Escape,
 * or scroll (the anchor rect would otherwise go stale).
 */
export function TranslationPopover({ source, anchor, status, result, onClose }: TranslationPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: anchor.bottom + 8, left: anchor.left });

  // Clamp within the viewport once we know the popover's real height.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const height = el.offsetHeight;
    let top = anchor.bottom + 8;
    if (top + height > window.innerHeight - 12) {
      top = Math.max(12, anchor.top - height - 8); // flip above if no room below
    }
    const left = Math.max(12, Math.min(anchor.left, window.innerWidth - WIDTH - 12));
    setPos({ top, left });
  }, [anchor]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    // mousedown (not click) so starting a fresh selection elsewhere closes this first.
    // We deliberately do NOT close on scroll: `scroll-behavior: smooth` means an
    // in-progress scroll would otherwise dismiss the popover the instant it opens.
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      className="tpop"
      style={{ top: pos.top, left: pos.left, width: WIDTH }}
      role="dialog"
      aria-label={`Translation of ${source}`}
    >
      <div className="tpop-src">{source}</div>
      <div className={'tpop-res' + (status === 'error' ? ' is-error' : '')}>
        {status === 'loading' && <span className="tpop-loading">Translating…</span>}
        {status === 'done' && (result || '—')}
        {status === 'error' && 'Translation unavailable — check your connection.'}
      </div>
      <div className="tpop-cite">fr → en · Google Translate</div>
    </div>,
    document.body,
  );
}
