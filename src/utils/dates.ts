const YYYY_MM = /^\d{4}-(0[1-9]|1[0-2])$/;

export function parseDate(dateStr: string): Date | null {
  if (!YYYY_MM.test(dateStr)) return null;
  const parsed = Date.parse(`${dateStr}-01`);
  return isNaN(parsed) ? null : new Date(parsed);
}

export function isValidDate(dateStr: string): boolean {
  return parseDate(dateStr) !== null;
}

export function sortByDateDesc<T extends { data: { date: string } }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = parseDate(a.data.date);
    const dateB = parseDate(b.data.date);
    if (!dateA || !dateB) return 0;
    return dateB.getTime() - dateA.getTime();
  });
}

export function sortByDateAsc<T extends { data: { date: string } }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = parseDate(a.data.date);
    const dateB = parseDate(b.data.date);
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
