import { format, startOfDay, addDays, eachDayOfInterval, isBefore } from 'date-fns';
import { AvailabilitySlot, AvailabilityRule } from '@/lib/models/availability';

export function formatTimeString(time: string): string {
  return time; // Already in HH:mm format
}

export function timeStringToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToTimeString(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function generateSlotsFromRules(
  rules: AvailabilityRule[],
  startDate: Date,
  endDate: Date,
  serviceDurationMinutes: number,
  bufferMinutes: number = 30
): AvailabilitySlot[] {
  const slots: AvailabilitySlot[] = [];
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  for (const date of dates) {
    const dayOfWeek = date.getDay();
    const relevantRules = rules.filter(r => r.day_of_week === dayOfWeek && r.is_active);

    for (const rule of relevantRules) {
      const startMinutes = timeStringToMinutes(rule.time_start);
      const endMinutes = timeStringToMinutes(rule.time_end);

      for (let minutes = startMinutes; minutes + serviceDurationMinutes <= endMinutes; minutes += bufferMinutes) {
        const slotStartTime = minutesToTimeString(minutes);
        const slotEndTime = minutesToTimeString(minutes + serviceDurationMinutes);

        slots.push({
          date: startOfDay(date),
          time_start: slotStartTime,
          time_end: slotEndTime,
          is_available: true,
          is_break: false,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
  }

  return slots;
}

export function formatDateForDisplay(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

export function formatTimeForDisplay(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function formatDateTimeForDisplay(date: Date, timeStr: string): string {
  return `${formatDateForDisplay(date)} at ${formatTimeForDisplay(timeStr)}`;
}

export function isTimeInPast(date: Date, timeStr: string): boolean {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const slotDate = new Date(date);
  slotDate.setHours(hours, minutes, 0, 0);
  return isBefore(slotDate, new Date());
}

export function generateCancelToken(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export function getCancelTokenExpiry(): Date {
  // Tokens expire after 30 days
  return addDays(new Date(), 30);
}
