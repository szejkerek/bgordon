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

type GameRef = { id: string; data: { game?: string } };
type Identified = { id: string };

/** Throws if any achievement references a game id that does not exist. */
export function assertGameRefs(achievements: GameRef[], games: Identified[]): void {
  const gameIds = new Set(games.map((game) => game.id));
  for (const achievement of achievements) {
    const ref = achievement.data.game;
    if (ref && !gameIds.has(ref)) {
      const valid = [...gameIds].sort().join(', ');
      throw new Error(
        `Achievement "${achievement.id}" references unknown game "${ref}". Valid IDs: ${valid}`
      );
    }
  }
}
