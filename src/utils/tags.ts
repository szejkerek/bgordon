type Tagged = { data: { tags?: string[] } };

/**
 * Distinct tags across the given projects, ordered by how many projects carry
 * each tag (descending). Each project counts at most once per tag.
 */
export function orderedTags(projects: Tagged[]): string[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tag of new Set(project.data.tags ?? [])) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.keys()].sort(
    (a, b) => counts.get(b)! - counts.get(a)! || a.localeCompare(b)
  );
}
