import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const AdminUserSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  email: z.string().email(),
  password_hash: z.string(),
  full_name: z.string().min(1),
  role: z.enum(['admin']).default('admin'),
  last_login: z.date().optional(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export type AdminUser = z.infer<typeof AdminUserSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type Login = z.infer<typeof LoginSchema>;
