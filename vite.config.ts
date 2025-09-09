import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ka-photographer',
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
});
