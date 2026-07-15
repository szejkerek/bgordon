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

/**
 * A project's visibility is derived from the folder it lives in — not from
 * frontmatter — so moving a file between `public/` and `private/` is the only
 * edit needed to show or hide it. The bare `slug` (id without the folder
 * prefix) is what URLs, images and achievement references key on.
 */
const PROJECT_FOLDER_VISIBLE: Record<string, boolean> = {
  public: true,
  private: false,
};

export type PublishedProject = CollectionEntry<'projects'> & { slug: string };

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
 * Published projects — those living in the `public/` folder — each tagged with
 * the bare `slug` derived by stripping the folder prefix from its id. Throws at
 * build if a project sits outside a known visibility folder (`public`/`private`).
 */
export async function publishedProjects(): Promise<PublishedProject[]> {
  const projects = await getCollection('projects');
  const shown: PublishedProject[] = [];
  for (const project of projects) {
    const [folder, ...rest] = project.id.split('/');
    const visible = PROJECT_FOLDER_VISIBLE[folder.toLowerCase()];
    if (visible === undefined || rest.length === 0) {
      throw new Error(
        `Project "${project.id}" is not in a visibility folder. Move it into one of: public, private`
      );
    }
    if (!visible) continue;
    shown.push(Object.assign(project, { slug: rest.join('/') }));
  }
  return sortByDateDesc(shown, (project) => project.data.date);
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
    publishedProjects(),
  ]);

  const projectIds = new Set(projects.map((project) => project.slug));
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
