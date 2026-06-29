import { describe, it, expect } from 'vitest';
import { selectPublished, assertGameRefs } from './content';

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

describe('assertGameRefs', () => {
  const games = [{ id: 'pong' }, { id: 'snake' }];

  it('passes when every achievement.game points at a real game', () => {
    const achievements = [
      { id: 'win', data: { game: 'pong' } },
      { id: 'noref', data: {} },
    ];

    expect(() => assertGameRefs(achievements, games)).not.toThrow();
  });

  it('throws naming the achievement and the unknown game', () => {
    const achievements = [{ id: 'win', data: { game: 'ghost' } }];

    expect(() => assertGameRefs(achievements, games)).toThrow(/win.*ghost/);
  });
});
