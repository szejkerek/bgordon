/**
 * Hero stats — all derived, never hand-maintained.
 * Time-based values recompute on every build (deploy), so they stay current
 * without editing any number by hand.
 */

/** Year the author started programming. */
export const PROGRAMMING_START_YEAR = 2016;

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/** Whole years of programming experience since {@link PROGRAMMING_START_YEAR}. */
export function programmingYears(now: Date): number {
  return now.getFullYear() - PROGRAMMING_START_YEAR;
}

/** Parse "Month YYYY" / "Present" into an absolute month index (year*12 + month). */
function parsePoint(text: string, now: Date): number | null {
  const value = text.trim().toLowerCase();
  if (value === 'present' || value === 'now') {
    return now.getFullYear() * 12 + now.getMonth();
  }
  const match = value.match(/^([a-z]+)\s+(\d{4})$/);
  if (!match) return null;
  const monthIndex = MONTHS.indexOf(match[1]);
  if (monthIndex < 0) return null;
  return Number(match[2]) * 12 + monthIndex;
}

/** Parse a "Month YYYY to Month YYYY | Present" period into a [start, end] month range. */
export function parsePeriod(period: string, now: Date): [number, number] | null {
  const parts = period.split(/\s+to\s+/i);
  if (parts.length !== 2) return null;
  const start = parsePoint(parts[0], now);
  const end = parsePoint(parts[1], now);
  if (start === null || end === null) return null;
  return start <= end ? [start, end] : [end, start];
}

/**
 * Total professional months across the given periods, with overlapping ranges
 * merged so concurrent jobs are not double-counted.
 */
export function professionalMonths(periods: string[], now: Date): number {
  const intervals = periods
    .map((period) => parsePeriod(period, now))
    .filter((range): range is [number, number] => range !== null)
    .sort((first, second) => first[0] - second[0]);

  let total = 0;
  let openStart: number | null = null;
  let openEnd = -1;

  for (const [start, end] of intervals) {
    if (openStart === null) {
      openStart = start;
      openEnd = end;
    } else if (start <= openEnd) {
      openEnd = Math.max(openEnd, end);
    } else {
      total += openEnd - openStart;
      openStart = start;
      openEnd = end;
    }
  }
  if (openStart !== null) total += openEnd - openStart;

  return total;
}

/** Whole professional years across the given periods (overlaps merged). */
export function professionalYears(periods: string[], now: Date): number {
  return Math.floor(professionalMonths(periods, now) / 12);
}

function plural(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? '' : 's'}`;
}

/** Format a month count as an exact "N years M months" duration (no rounding). */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  if (years === 0) return plural(remainder, 'month');
  if (remainder === 0) return plural(years, 'year');
  return `${plural(years, 'year')} ${plural(remainder, 'month')}`;
}
