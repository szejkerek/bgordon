import { describe, it, expect, beforeEach } from 'vitest';
import { selectPublished, published, publishedProjects, publishedAchievements } from './content';
import { __setCollection, __resetCollections } from '../test/stubs/astro-content';

describe('selectPublished', () => {
  it('excludes entries marked draft', () => {
    const entries = [
      { id: 'live', data: { date: '2025-01', draft: false } },
      { id: 'hidden', data: { date: '2025-02', draft: true } },
    ];

    const result = selectPublished(entries);

    expect(result.map((e) => e.id)).toEqual(['live']);
  });

  it('keeps entries whose draft flag is false or absent', () => {
    const entries = [
      { id: 'explicit', data: { date: '2025-01', draft: false } },
      { id: 'absent', data: { date: '2025-02' } },
    ];

    const result = selectPublished(entries);

    expect(result.map((e) => e.id).sort()).toEqual(['absent', 'explicit']);
  });

  it('returns the survivors sorted newest-first by date', () => {
    const entries = [
      { id: 'old', data: { date: '2024-03' } },
      { id: 'new', data: { date: '2026-02' } },
      { id: 'mid', data: { date: '2025-07' } },
    ];

    const result = selectPublished(entries);

    expect(result.map((e) => e.id)).toEqual(['new', 'mid', 'old']);
  });
});

// Cross the same seam the pages cross: getCollection -> filter drafts -> sort.
describe('published', () => {
  beforeEach(() => {
    __resetCollections();
  });

  it('drops drafts and sorts newest-first, all through one call', async () => {
    __setCollection('projects', [
      { id: 'old', data: { date: '2023-05', draft: false } },
      { id: 'wip', data: { date: '2026-01', draft: true } },
      { id: 'new', data: { date: '2025-11' } },
    ]);

    const result = await published('projects' as never);

    expect(result.map((e) => e.id)).toEqual(['new', 'old']);
  });

  it('returns an empty list when the collection is empty', async () => {
    const result = await published('achievements' as never);

    expect(result).toEqual([]);
  });
});

describe('publishedProjects', () => {
  beforeEach(() => {
    __resetCollections();
  });

  it('shows only public/ projects, strips the folder prefix into slug, sorts newest-first', async () => {
    __setCollection('projects', [
      { id: 'public/old', data: { date: '2023-05' } },
      { id: 'private/secret', data: { date: '2026-01' } },
      { id: 'public/new', data: { date: '2025-11' } },
    ]);

    const result = await publishedProjects();

    expect(result.map((project) => project.slug)).toEqual(['new', 'old']);
  });

  it('throws when a project sits outside a visibility folder', async () => {
    __setCollection('projects', [{ id: 'loose', data: { date: '2025-01' } }]);

    await expect(publishedProjects()).rejects.toThrow(/public, private/);
  });
});

describe('publishedAchievements', () => {
  beforeEach(() => {
    __resetCollections();
  });

  it('passes when every project reference resolves to a published project', async () => {
    __setCollection('projects', [{ id: 'public/pong', data: { date: '2025-01' } }]);
    __setCollection('achievements', [
      { id: 'win', data: { date: '2025-02', project: { collection: 'projects', id: 'pong' } } },
      { id: 'noref', data: { date: '2025-03' } },
    ]);

    const result = await publishedAchievements();

    expect(result.map((e) => e.id)).toEqual(['noref', 'win']);
  });

  it('throws naming the achievement and the unknown project', async () => {
    __setCollection('projects', [{ id: 'public/pong', data: { date: '2025-01' } }]);
    __setCollection('achievements', [
      { id: 'win', data: { date: '2025-02', project: { collection: 'projects', id: 'ghost' } } },
    ]);

    await expect(publishedAchievements()).rejects.toThrow(/win.*ghost/);
  });

  it('rejects a reference to a project in the private folder', async () => {
    __setCollection('projects', [{ id: 'private/pong', data: { date: '2025-01' } }]);
    __setCollection('achievements', [
      { id: 'win', data: { date: '2025-02', project: { collection: 'projects', id: 'pong' } } },
    ]);

    await expect(publishedAchievements()).rejects.toThrow(/pong/);
  });
});
