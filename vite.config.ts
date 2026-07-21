import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from https://<user>.github.io/french-course/ on GitHub Pages,
// so assets must be resolved against that sub-path in production. Locally (dev) the
// base is '/'. See .github/workflows/deploy.yml.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/french-course/' : '/',
  plugins: [react()],
}));
