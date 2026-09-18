import { describe, it, expect } from 'vitest';
import {
  programmingYears,
  age,
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

describe('age', () => {
  const birth = new Date(2001, 9, 28); // 28 Oct 2001

  it('subtracts a year when the birthday has not passed yet', () => {
    expect(age(birth, NOW)).toBe(24); // July 2026, before October
  });

  it('counts the full year on/after the birthday', () => {
    expect(age(birth, new Date(2026, 9, 28))).toBe(25);
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
    // merged: [Apr2022..Jul2023] = 16  +  [Jul2024..Jul2026] = 25  => 41
    expect(professionalMonths(periods, NOW)).toBe(41);
  });

  it('counts both endpoints of a single period', () => {
    // May, June, July
    expect(professionalMonths(['May 2023 to July 2023'], NOW)).toBe(3);
  });

  it('counts a job starting this month as one month', () => {
    expect(professionalMonths(['July 2026 to Present'], NOW)).toBe(1);
  });

  it('merges consecutive periods without inventing a gap month', () => {
    const periods = ['January 2022 to March 2022', 'April 2022 to June 2022'];
    expect(professionalMonths(periods, NOW)).toBe(6);
  });

  it('keeps a real gap between periods out of the total', () => {
    const periods = ['January 2022 to February 2022', 'May 2022 to June 2022'];
    expect(professionalMonths(periods, NOW)).toBe(4);
  });

  it('ignores unparseable periods', () => {
    expect(professionalMonths(['garbage', 'July 2024 to Present'], NOW)).toBe(25);
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
