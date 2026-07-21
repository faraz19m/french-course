import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Sidebar } from './Sidebar';

/** App shell: persistent sidebar + routed main content, with scroll reset on navigation. */
export function Layout() {
  // `key` is unique per history entry, so this fires on *every* navigation —
  // including re-clicking the link for the page you're already on, which a
  // `pathname` dependency would miss. Mirrors the original's scroll-to-top.
  const { key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  return (
    <div className="wrap">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
