// Runtime stub for `astro:content` so unit tests can import modules that
// reference it. Only the runtime values are needed — Astro's types are
// erased by esbuild during test transpilation.
//
// The stub is a seedable adapter: tests call `__setCollection` to stand in
// for real collection data, so code that composes `getCollection` (e.g.
// `published`) can be tested through the same seam the pages cross.

const collections = new Map<string, unknown[]>();

/** Seed the entries a later `getCollection(name)` call will return. */
export function __setCollection(name: string, entries: unknown[]): void {
  collections.set(name, entries);
}

/** Clear all seeded collections. Call between tests. */
export function __resetCollections(): void {
  collections.clear();
}

export function getCollection(name: string): Promise<unknown[]> {
  return Promise.resolve(collections.get(name) ?? []);
}
