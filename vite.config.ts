/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from https://<user>.github.io/french-course/ on GitHub Pages,
// so assets must resolve against that sub-path. We use the same base everywhere —
// dev, build, and preview — because a build-only base makes `npm run preview` 404
// on every asset: preview serves the production build (whose URLs are baked with
// this base) but runs with command 'serve'. See .github/workflows/deploy.yml.
export default defineConfig({
  base: '/french-course/',
  plugins: [react()],
  test: {
    // jsdom gives tests a DOM + localStorage; browser-only modules (storage,
    // useProgress, Testing Library) rely on it. Pure-logic tests run fine here too.
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
