import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      'astro:content': fileURLToPath(new URL('./src/test/stubs/astro-content.ts', import.meta.url)),
    },
  },
});
