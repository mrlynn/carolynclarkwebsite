import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const ServiceSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string().min(1),
  description: z.string(),
  duration_minutes: z.number().int().min(15),
  price: z.number().positive(),
  active: z.boolean().default(true),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export type Service = z.infer<typeof ServiceSchema>;

export const SERVICES = {
  MFR: {
    name: 'Myofascial Release',
    description: 'John F. Barnes Myofascial Release technique for pain relief and lasting change',
    duration_minutes: 60,
    price: 125,
  },
  MASSAGE: {
    name: 'Therapeutic Massage',
    description: 'Therapeutic massage to promote relaxation and healing',
    duration_minutes: 90,
    price: 150,
  },
};
