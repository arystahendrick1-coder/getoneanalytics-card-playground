import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Keep the generated JavaScript readable during diagnosis so browser errors
// can be mapped back to the original JSX source instead of minified names.
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    minify: false,
  },
});
