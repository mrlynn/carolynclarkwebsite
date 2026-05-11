import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const AvailabilityRuleSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  day_of_week: z.number().min(0).max(6), // 0 = Sunday, 6 = Saturday
  time_start: z.string().regex(/^\d{2}:\d{2}$/), // HH:mm format
  time_end: z.string().regex(/^\d{2}:\d{2}$/),
  buffer_minutes: z.number().int().default(30),
  is_active: z.boolean().default(true),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export type AvailabilityRule = z.infer<typeof AvailabilityRuleSchema>;

export const AvailabilitySlotSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  date: z.date(),
  time_start: z.string().regex(/^\d{2}:\d{2}$/),
  time_end: z.string().regex(/^\d{2}:\d{2}$/),
  is_available: z.boolean().default(true),
  is_break: z.boolean().default(false),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export type AvailabilitySlot = z.infer<typeof AvailabilitySlotSchema>;
