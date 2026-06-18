import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
});
