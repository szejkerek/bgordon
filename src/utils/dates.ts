/**
 * Date Parsing and Validation Utilities
 * 
 * Centralized date handling for content collections.
 */

/**
 * Parse "Month Year" format to Date object
 * Example: "January 2024" -> Date
 */
export function parseMonthYearDate(dateStr: string): Date | null {
  // Try to parse "Month Year" format by adding day 1
  const normalized = dateStr.replace(/(\w+)\s+(\d{4})/, '$1 1, $2');
  const parsed = Date.parse(normalized);
  
  if (isNaN(parsed)) {
    return null;
  }
  
  return new Date(parsed);
}

/**
 * Validate "Month Year" date format
 */
export function isValidMonthYearDate(dateStr: string): boolean {
  return parseMonthYearDate(dateStr) !== null;
}

/**
 * Sort items by date (newest first)
 */
export function sortByDateDesc<T extends { data: { date: string } }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = parseMonthYearDate(a.data.date);
    const dateB = parseMonthYearDate(b.data.date);
    
    if (!dateA || !dateB) return 0;
    
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Sort items by date (oldest first)
 */
export function sortByDateAsc<T extends { data: { date: string } }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = parseMonthYearDate(a.data.date);
    const dateB = parseMonthYearDate(b.data.date);
    
    if (!dateA || !dateB) return 0;
    
    return dateA.getTime() - dateB.getTime();
  });
}

/**
 * Get current year
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Zod refinement helper for date validation
 * Use in content config: z.string().refine(dateRefine, dateRefineMessage)
 */
export const dateRefine = (val: string): boolean => isValidMonthYearDate(val);

export const dateRefineMessage = {
  message: 'Invalid date format. Use "Month Year" format (e.g., "January 2024")',
};
