import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { sortByDateDesc } from './dates';

type PublishableEntry = { data: { date?: string; draft?: boolean } };

/**
 * A book's reading status is derived from the folder it lives in — not from
 * frontmatter — so moving a file between folders is the only edit needed to
 * change its status.
 */
export type BookStatus = 'reading' | 'finished' | 'want-to-read';

// Keyed by the lowercased folder name — Astro's glob loader lowercases entry ids.
const BOOK_FOLDER_STATUS: Record<string, BookStatus> = {
  reading: 'reading',
  finished: 'finished',
  wantstoread: 'want-to-read',
};

export type PublishedBook = CollectionEntry<'books'> & { status: BookStatus };

export function selectPublished<T extends PublishableEntry>(entries: T[]): T[] {
  const live = entries.filter((entry) => !entry.data.draft);
  return sortByDateDesc(live, (entry) => entry.data.date);
}

export async function published<C extends CollectionKey>(name: C): Promise<CollectionEntry<C>[]> {
  return selectPublished(await getCollection(name));
}

/**
 * Published books, each tagged with the status derived from its folder
 * (`Reading/`, `Finished/`, `WantsToRead/`). Throws at build if a book sits
 * outside a known status folder.
 */
export async function publishedBooks(): Promise<PublishedBook[]> {
  const books = await getCollection('books');
  return books
    .filter((book) => !book.data.draft)
    .map((book) => {
      const folder = book.id.split('/')[0].toLowerCase();
      const status = BOOK_FOLDER_STATUS[folder];
      if (!status) {
        throw new Error(
          `Book "${book.id}" is not in a status folder. Move it into one of: Reading, Finished, WantsToRead`
        );
      }
      return Object.assign(book, { status });
    });
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
