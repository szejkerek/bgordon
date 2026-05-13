import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: "https://bgordon.pl",
  integrations: [svelte()],
  compressHTML: true,
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
