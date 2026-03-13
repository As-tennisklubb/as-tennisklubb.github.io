// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://as-tennisklubb.github.io',
  base: '/',

  vite: {
    plugins: [tailwindcss()],
  },
});
