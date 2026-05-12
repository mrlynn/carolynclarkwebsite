import { z } from 'zod';

export const DurationOptionSchema = z.object({
  durationMinutes: z
    .number()
    .int('Duration must be a whole number')
    .min(15, 'Minimum duration is 15 minutes')
    .max(300, 'Maximum duration is 300 minutes'),
  price: z.number().positive('Price must be a positive number'),
});

export const CreateServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['massage', 'therapy', 'wellness'], {
    errorMap: () => ({ message: 'Invalid category' }),
  }),
  durations: z.array(DurationOptionSchema).min(1, 'At least one duration option is required'),
  featured: z.boolean().default(false),
});

export const UpdateServiceSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(10).optional(),
  category: z.enum(['massage', 'therapy', 'wellness']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
  durations: z.array(DurationOptionSchema).min(1).optional(),
  featured: z.boolean().optional(),
});

export type CreateServiceInput = z.infer<typeof CreateServiceSchema>;
export type UpdateServiceInput = z.infer<typeof UpdateServiceSchema>;
export type DurationOptionInput = z.infer<typeof DurationOptionSchema>;
