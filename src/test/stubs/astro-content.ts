// Runtime stub for `astro:content` so unit tests can import modules that
// reference it. Only the runtime values are needed — Astro's types are
// erased by esbuild during test transpilation.
export function getCollection(): Promise<unknown[]> {
  return Promise.resolve([]);
}
