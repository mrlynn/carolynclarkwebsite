// scheduled_at is stored as a "floating" wall-clock time encoded as UTC
// (e.g. "2026-05-15T09:00:00Z" means 9:00 AM business-local, not 9:00 UTC).
// Always format these values in UTC so the wall-clock value is preserved
// regardless of the viewer's browser/server timezone.

export function dateToISOString(date: Date): string {
  return date.toISOString();
}

export function isoStringToDate(isoString: string): Date {
  return new Date(isoString);
}

export function createScheduledAtISO(localDate: Date, timeString: string): string {
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T${timeString}:00Z`;
}

export function formatDisplayDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj);
}

export function formatDisplayTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(dateObj);
}

export function formatDisplayDateTime(date: Date | string): string {
  return `${formatDisplayDate(date)} at ${formatDisplayTime(date)}`;
}
