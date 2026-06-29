import { describe, it, expect } from 'vitest';
import { monthDate, draftFlag, optUrl } from './content.schemas';

describe('monthDate fragment', () => {
  it('accepts a "YYYY-MM" string', () => {
    expect(monthDate.safeParse('2024-01').success).toBe(true);
  });

  it('rejects an out-of-range month', () => {
    expect(monthDate.safeParse('2024-13').success).toBe(false);
  });

  it('rejects a non-date string', () => {
    expect(monthDate.safeParse('soon').success).toBe(false);
  });
});

describe('draftFlag fragment', () => {
  it('defaults to false when absent', () => {
    expect(draftFlag.parse(undefined)).toBe(false);
  });

  it('keeps an explicit true', () => {
    expect(draftFlag.parse(true)).toBe(true);
  });
});

describe('optUrl fragment', () => {
  it('accepts a valid url', () => {
    expect(optUrl.safeParse('https://example.com').success).toBe(true);
  });

  it('allows undefined', () => {
    expect(optUrl.safeParse(undefined).success).toBe(true);
  });

  it('rejects a non-url string', () => {
    expect(optUrl.safeParse('not a url').success).toBe(false);
  });
});
