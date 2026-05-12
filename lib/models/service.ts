import { z } from 'zod';
import { ObjectId } from 'mongodb';

const DurationOptionSchema = z.object({
  durationMinutes: z.number().int().min(15).max(300),
  price: z.number().positive(),
});

export const ServiceSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  category: z.enum(['massage', 'therapy', 'wellness']),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum(['active', 'inactive']).default('active'),
  featured: z.boolean().default(false),
  durations: z.array(DurationOptionSchema).min(1),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  createdBy: z.instanceof(ObjectId).optional(),
  updatedBy: z.instanceof(ObjectId).optional(),
});

export type Service = z.infer<typeof ServiceSchema>;
export type DurationOption = z.infer<typeof DurationOptionSchema>;
