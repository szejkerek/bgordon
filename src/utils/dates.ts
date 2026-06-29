const YYYY_MM = /^\d{4}-(0[1-9]|1[0-2])$/;
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  return `${MONTHS[parseInt(month) - 1]} ${year}`;
}

export function parseDate(dateStr: string): Date | null {
  if (!YYYY_MM.test(dateStr)) return null;
  const parsed = Date.parse(`${dateStr}-01`);
  return isNaN(parsed) ? null : new Date(parsed);
}

export function isValidDate(dateStr: string): boolean {
  return parseDate(dateStr) !== null;
}

type DateAccessor<T> = (item: T) => string | undefined;

const byDataDate: DateAccessor<{ data: { date: string } }> = (item) => item.data.date;

export function sortByDateDesc<T extends { data: { date: string } }>(items: T[]): T[];
export function sortByDateDesc<T>(items: T[], getDate: DateAccessor<T>): T[];
export function sortByDateDesc<T>(items: T[], getDate: DateAccessor<T> = byDataDate as DateAccessor<T>): T[] {
  return [...items].sort((a, b) => {
    const dateA = parseDate(getDate(a) ?? '');
    const dateB = parseDate(getDate(b) ?? '');
    if (!dateA || !dateB) return 0;
    return dateB.getTime() - dateA.getTime();
  });
}

export function sortByDateAsc<T extends { data: { date: string } }>(items: T[]): T[];
export function sortByDateAsc<T>(items: T[], getDate: DateAccessor<T>): T[];
export function sortByDateAsc<T>(items: T[], getDate: DateAccessor<T> = byDataDate as DateAccessor<T>): T[] {
  return [...items].sort((a, b) => {
    const dateA = parseDate(getDate(a) ?? '');
    const dateB = parseDate(getDate(b) ?? '');
    if (!dateA || !dateB) return 0;
    return dateA.getTime() - dateB.getTime();
  });
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export const dateRefine = (val: string): boolean => isValidDate(val);

export const dateRefineMessage = {
  message: 'Invalid date format. Use "YYYY-MM" (e.g., "2024-01")',
};
