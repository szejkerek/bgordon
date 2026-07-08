import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { sortByDateDesc } from './dates';

type PublishableEntry = { data: { date?: string; draft?: boolean } };

export function selectPublished<T extends PublishableEntry>(entries: T[]): T[] {
  const live = entries.filter((entry) => !entry.data.draft);
  return sortByDateDesc(live, (entry) => entry.data.date);
}

export async function published<C extends CollectionKey>(name: C): Promise<CollectionEntry<C>[]> {
  return selectPublished(await getCollection(name));
}

type ProjectRef = { id: string; data: { project?: string } };
type Identified = { id: string };

/** Throws if any achievement references a project id that does not exist. */
export function assertProjectRefs(achievements: ProjectRef[], projects: Identified[]): void {
  const projectIds = new Set(projects.map((project) => project.id));
  for (const achievement of achievements) {
    const ref = achievement.data.project;
    if (ref && !projectIds.has(ref)) {
      const valid = [...projectIds].sort().join(', ');
      throw new Error(
        `Achievement "${achievement.id}" references unknown project "${ref}". Valid IDs: ${valid}`
      );
    }
  }
}
