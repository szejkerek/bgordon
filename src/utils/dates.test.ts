import { describe, it, expect } from 'vitest';
import { sortByDateDesc } from './dates';

describe('sortByDateDesc', () => {
  it('sorts entries newest-first using a custom date accessor', () => {
    const books = [
      { title: 'old', finished: '2024-01' },
      { title: 'new', finished: '2026-05' },
      { title: 'mid', finished: '2025-03' },
    ];

    const sorted = sortByDateDesc(books, (b) => b.finished);

    expect(sorted.map((b) => b.title)).toEqual(['new', 'mid', 'old']);
  });

  it('defaults to data.date so existing collection callers need no accessor', () => {
    const games = [
      { id: 'a', data: { date: '2025-02' } },
      { id: 'b', data: { date: '2026-01' } },
    ];

    const sorted = sortByDateDesc(games);

    expect(sorted.map((g) => g.id)).toEqual(['b', 'a']);
  });

  it('supports a fallback accessor like books (finishDate ?? startDate)', () => {
    const books = [
      { title: 'started-only', startDate: '2025-01', finishDate: undefined },
      { title: 'finished', startDate: '2024-01', finishDate: '2026-06' },
    ];

    const sorted = sortByDateDesc(books, (b) => b.finishDate ?? b.startDate);

    expect(sorted.map((b) => b.title)).toEqual(['finished', 'started-only']);
  });

  it('does not crash or reorder when a date is missing or unparseable', () => {
    const items = [
      { id: 'good', when: '2025-05' },
      { id: 'missing', when: undefined },
      { id: 'garbage', when: 'not-a-date' },
    ];

    const sorted = sortByDateDesc(items, (i) => i.when);

    expect(sorted).toHaveLength(3);
  });

  it('returns a new array without mutating the input', () => {
    const games = [
      { id: 'a', data: { date: '2025-02' } },
      { id: 'b', data: { date: '2026-01' } },
    ];

    const sorted = sortByDateDesc(games);

    expect(sorted).not.toBe(games);
    expect(games.map((g) => g.id)).toEqual(['a', 'b']);
  });
});
