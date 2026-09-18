/**
 * Distinct tags across the given tag lists, ordered by how many lists carry
 * each tag (descending), ties broken alphabetically. One list per project, so a
 * project counts at most once per tag even if it repeats one.
 */
export function orderedTags(tagLists: (string[] | undefined)[]): string[] {
  const counts = new Map<string, number>();
  for (const tags of tagLists) {
    for (const tag of new Set(tags ?? [])) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.keys()].sort(
    (a, b) => counts.get(b)! - counts.get(a)! || a.localeCompare(b)
  );
}
