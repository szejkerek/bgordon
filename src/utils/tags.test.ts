import { describe, it, expect } from 'vitest';
import { orderedTags } from './tags';

const p = (...tags: string[]) => ({ data: { tags } });

describe('orderedTags', () => {
  it('orders tags by descending project count', () => {
    const result = orderedTags([p('Unity', 'C#'), p('Unity'), p('Unity')]);

    expect(result).toEqual(['Unity', 'C#']);
  });

  it('breaks ties alphabetically', () => {
    const result = orderedTags([p('Rust'), p('Go'), p('Zig')]);

    expect(result).toEqual(['Go', 'Rust', 'Zig']);
  });

  it('counts a tag once even if a project lists it twice', () => {
    const result = orderedTags([p('Unity', 'Unity'), p('C#')]);

    // Unity counted once (1 project), tied with C# (1) → alphabetical
    expect(result).toEqual(['C#', 'Unity']);
  });

  it('ignores projects with no tags and returns every distinct tag', () => {
    const result = orderedTags([p(), p('A'), { data: {} }, p('B')]);

    expect(result).toEqual(['A', 'B']);
  });
});
