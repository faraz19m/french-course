import { HashRouter, Route, Routes } from 'react-router-dom';
import { ProgressProvider } from './hooks/ProgressContext';
import { SettingsProvider } from './hooks/SettingsContext';
import { TranslationProvider } from './hooks/TranslationContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { NotFound } from './pages/NotFound';

/**
 * Uses HashRouter deliberately: the site is hosted on GitHub Pages, which has no
 * server-side rewrite for client routes. Hash-based URLs (/#/lesson/bonjour) are
 * deep-linkable and survive a hard refresh without any 404 workaround.
 */
export function App() {
  return (
    <ProgressProvider>
      <SettingsProvider>
        <TranslationProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="lesson/:slug" element={<LessonPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </HashRouter>
        </TranslationProvider>
      </SettingsProvider>
    </ProgressProvider>
  );
}
