import { describe, it, expect } from 'vitest';
import {
  programmingYears,
  parsePeriod,
  professionalMonths,
  professionalYears,
  formatDuration,
} from './stats';

const NOW = new Date(2026, 6, 11); // July 2026 (month is 0-based)

describe('programmingYears', () => {
  it('counts whole years since 2016', () => {
    expect(programmingYears(NOW)).toBe(10);
  });
});

describe('parsePeriod', () => {
  it('parses a closed range', () => {
    // April 2022 (2022*12+3) to July 2023 (2023*12+6)
    expect(parsePeriod('April 2022 to July 2023', NOW)).toEqual([24267, 24282]);
  });

  it('resolves "Present" to now', () => {
    // July 2024 to July 2026
    expect(parsePeriod('July 2024 to Present', NOW)).toEqual([24294, 24318]);
  });

  it('returns null for unparseable input', () => {
    expect(parsePeriod('sometime last year', NOW)).toBeNull();
  });
});

describe('professionalMonths', () => {
  it('merges overlapping periods instead of double-counting', () => {
    const periods = [
      'July 2024 to Present', // 24 months
      'May 2023 to July 2023', // inside IT Silesia below
      'April 2022 to July 2023', // 15 months (absorbs Radicate)
    ];
    // merged: [Apr2022..Jul2023] = 15  +  [Jul2024..Jul2026] = 24  => 39
    expect(professionalMonths(periods, NOW)).toBe(39);
  });

  it('ignores unparseable periods', () => {
    expect(professionalMonths(['garbage', 'July 2024 to Present'], NOW)).toBe(24);
  });
});

describe('formatDuration', () => {
  it('formats years and months exactly', () => {
    expect(formatDuration(39)).toBe('3 years 3 months');
  });

  it('drops months when zero', () => {
    expect(formatDuration(24)).toBe('2 years');
  });

  it('uses singular units', () => {
    expect(formatDuration(13)).toBe('1 year 1 month');
  });

  it('handles sub-year durations', () => {
    expect(formatDuration(5)).toBe('5 months');
  });
});

describe('professionalYears', () => {
  it('floors merged months to whole years', () => {
    const periods = [
      'July 2024 to Present',
      'May 2023 to July 2023',
      'April 2022 to July 2023',
    ];
    expect(professionalYears(periods, NOW)).toBe(3);
  });
});
