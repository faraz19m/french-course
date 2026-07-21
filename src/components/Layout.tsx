import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Sidebar } from './Sidebar';

/** App shell: persistent sidebar + routed main content, with scroll reset on navigation. */
export function Layout() {
  const { pathname } = useLocation();

  // Each lesson/overview should open at the top, mirroring the original's
  // scroll-to-top on navigation.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="wrap">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
