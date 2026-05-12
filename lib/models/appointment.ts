import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const AppointmentSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  service_id: z.instanceof(ObjectId),
  client_name: z.string().min(1),
  client_email: z.string().email(),
  client_phone: z.string().min(10),
  client_notes: z.string().optional().default(''),
  scheduled_at: z.date(),
  duration_minutes: z.number().int().min(15),
  total_price: z.number().positive(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).default('pending'),

  confirmation_sent: z.boolean().default(false),
  confirmation_sent_at: z.date().optional(),
  reminder_sent: z.boolean().default(false),
  reminder_sent_at: z.date().optional(),

  cancel_token: z.string(),
  cancel_token_expires_at: z.date(),

  google_calendar_event_id: z.string().optional(),

  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export type Appointment = z.infer<typeof AppointmentSchema>;

export const BookingFormSchema = z.object({
  serviceId: z.string(),
  clientName: z.string().min(1, 'Name is required'),
  clientEmail: z.string().email('Invalid email address'),
  clientPhone: z.string().min(10, 'Phone number is required'),
  clientNotes: z.string().optional().default(''),
  scheduledAt: z.string().or(z.date()).transform((val) => {
    if (val instanceof Date) return val;
    return new Date(val);
  }),
  duration_minutes: z.number().int().min(15, 'Duration must be at least 15 minutes'),
});

export type BookingForm = z.infer<typeof BookingFormSchema>;
