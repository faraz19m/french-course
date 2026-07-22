import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type TranslationStatus = 'loading' | 'done' | 'error';

interface TranslationPopoverProps {
  /** The source text being looked up. */
  source: string;
  /** Viewport-relative rectangle of the clicked word / selected text. */
  anchor: DOMRect;
  status: TranslationStatus;
  result: string;
  /** Resolved translation direction (e.g. 'fr' → 'en'), shown in the footer. */
  from?: string;
  to?: string;
  onClose: () => void;
}

const WIDTH = 280;

/**
 * A small floating card showing a word/phrase and its English translation,
 * anchored to whatever the learner clicked or selected. Rendered in a portal so
 * it's never clipped by lesson content, and dismissed on outside click or
 * Escape. It is NOT dismissed on scroll (`scroll-behavior: smooth` would
 * otherwise dismiss it the instant it opens); instead it tracks the scroll
 * offset so it stays pinned to the anchored text.
 */
export function TranslationPopover({
  source,
  anchor,
  status,
  result,
  from,
  to,
  onClose,
}: TranslationPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: anchor.bottom + 8, left: anchor.left, width: WIDTH });
  // How far the page has scrolled since the popover opened, so a fixed-position
  // card can follow the anchored word rather than drifting off it.
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  // Bumped on visual-viewport changes (pinch-zoom, the mobile address bar
  // growing/shrinking) so the clamp below re-runs against the real visible area.
  const [vpTick, setVpTick] = useState(0);

  // Clamp within the viewport once we know the popover's real size. Re-runs when
  // the content changes (loading → done) since that changes the height, and when
  // the visual viewport changes on mobile.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The visual viewport is the actually-visible area on mobile (after the
    // address bar and pinch-zoom); fall back to the layout viewport elsewhere.
    const vv = window.visualViewport;
    const vw = vv?.width ?? window.innerWidth;
    const vh = vv?.height ?? window.innerHeight;
    const width = Math.min(WIDTH, vw - 24);
    const height = el.offsetHeight;
    let top = anchor.bottom + 8;
    if (top + height > vh - 12) {
      top = Math.max(12, anchor.top - height - 8); // flip above if no room below
    }
    const left = Math.max(12, Math.min(anchor.left, vw - width - 12));
    setPos({ top, left, width });
  }, [anchor, status, result, vpTick]);

  useEffect(() => {
    // Close when the user starts a new interaction outside the card. mousedown
    // (not click) so starting a fresh selection elsewhere closes this first;
    // touchstart mirrors it for touch devices, where mousedown isn't reliable.
    const onDown = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const originX = window.scrollX;
    const originY = window.scrollY;
    const onScroll = () => setScroll({ x: window.scrollX - originX, y: window.scrollY - originY });
    const onViewport = () => setVpTick((t) => t + 1);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Track pinch-zoom / address-bar changes so the card stays put on mobile.
    window.visualViewport?.addEventListener('resize', onViewport);
    window.visualViewport?.addEventListener('scroll', onViewport);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
      window.visualViewport?.removeEventListener('resize', onViewport);
      window.visualViewport?.removeEventListener('scroll', onViewport);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      className="tpop"
      style={{ top: pos.top - scroll.y, left: pos.left - scroll.x, width: pos.width }}
      role="dialog"
      aria-label={`Translation of ${source}`}
    >
      <div className="tpop-src">{source}</div>
      <div className={'tpop-res' + (status === 'error' ? ' is-error' : '')}>
        {status === 'loading' && <span className="tpop-loading">Translating…</span>}
        {status === 'done' && (result || '—')}
        {status === 'error' && 'Translation unavailable — check your connection.'}
      </div>
      <div className="tpop-cite">{from && to ? `${from} → ${to} · ` : ''}Google Translate</div>
    </div>,
    document.body,
  );
}
