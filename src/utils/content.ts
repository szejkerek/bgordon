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

/**
 * Published achievements, with every project reference verified to resolve to a
 * published project. Astro's `reference()` types the link but does not check
 * existence at build, so this is the single place that guarantee lives — every
 * reader of achievements inherits it.
 */
export async function publishedAchievements(): Promise<CollectionEntry<'achievements'>[]> {
  const [achievements, projects] = await Promise.all([
    published('achievements'),
    published('projects'),
  ]);

  const projectIds = new Set(projects.map((project) => project.id));
  for (const achievement of achievements) {
    const ref = achievement.data.project;
    if (ref && !projectIds.has(ref.id)) {
      const valid = [...projectIds].sort().join(', ');
      throw new Error(
        `Achievement "${achievement.id}" references unknown project "${ref.id}". Valid IDs: ${valid}`
      );
    }
  }

  return achievements;
}
