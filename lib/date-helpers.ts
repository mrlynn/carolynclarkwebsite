import { format, parse } from 'date-fns';

/**
 * Consistent date handling throughout the booking flow.
 *
 * Strategy: Use ISO 8601 format with UTC timezone (Z suffix) everywhere.
 * This prevents timezone ambiguity and works consistently across all browsers.
 */

/**
 * Convert a local Date object to ISO string for storage/transmission
 */
export function dateToISOString(date: Date): string {
  return date.toISOString();
}

/**
 * Parse ISO string back to Date object
 */
export function isoStringToDate(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Create an ISO string from local date and time
 * @param localDate - A local Date object (from date picker, etc)
 * @param timeString - Time in HH:mm format (e.g., "09:00")
 */
export function createScheduledAtISO(localDate: Date, timeString: string): string {
  // Create a date string in YYYY-MM-DD format from local date
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');

  // Combine with time to create ISO string
  // This creates a string like "2026-05-25T10:00:00Z"
  return `${year}-${month}-${day}T${timeString}:00Z`;
}

/**
 * Format a date for display (e.g., "May 25, 2026")
 */
export function formatDisplayDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMMM d, yyyy');
}

/**
 * Format time for display (e.g., "10:00 AM")
 */
export function formatDisplayTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'h:mm a');
}

/**
 * Format date and time together (e.g., "May 25, 2026 at 10:00 AM")
 */
export function formatDisplayDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMMM d, yyyy \'at\' h:mm a');
}
