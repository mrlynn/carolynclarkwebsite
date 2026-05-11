import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const TestimonialSchema = z.object({
  client_name: z.string().min(1, 'Name is required'),
  client_email: z.string().email('Invalid email').optional().default(''),
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(20, 'Review must be at least 20 characters'),
  service: z.enum(['myofascial_release', 'therapeutic_massage', 'other']).optional().default('other'),
  appointment_id: z.string().optional(),
});

export type TestimonialInput = z.infer<typeof TestimonialSchema>;

export interface Testimonial {
  _id?: ObjectId;
  client_name: string;
  client_email: string;
  rating: number;
  title: string;
  content: string;
  service: string;
  appointment_id?: ObjectId | string;
  source: 'internal' | 'google' | 'imported';
  status: 'pending' | 'approved' | 'rejected';
  is_featured: boolean;
  google_review_id?: string;
  created_at: Date;
  updated_at: Date;
  approved_at?: Date;
  approved_by?: ObjectId | string;
}

export interface TestimonialDocument {
  _id?: ObjectId;
  client_name: string;
  client_email: string;
  rating: number;
  title: string;
  content: string;
  service: string;
  appointment_id?: ObjectId;
  source: 'internal' | 'google' | 'imported';
  status: 'pending' | 'approved' | 'rejected';
  is_featured: boolean;
  google_review_id?: string;
  created_at: Date;
  updated_at: Date;
  approved_at?: Date;
  approved_by?: ObjectId;
}
