import { z } from 'zod';
import type { Email, HttpUrl, PhoneNumber } from '../types/primitives.types';

export const emailSchema = z
  .string()
  .email('Must be a valid email address')
  .transform(v => v as Email);

export const phoneSchema = z
  .string()
  .regex(
    /^\+?[\d\s\-().]{7,20}$/,
    'Must be a valid phone number'
  )
  .transform(v => v as PhoneNumber);

export const httpUrlSchema = z
  .string()
  .url('Must be a valid URL')
  .transform(v => v as HttpUrl);

// Resume dates — any non-empty string is valid (display strings, not Date objects)
export const resumeDateSchema = z.string().min(1, 'Date is required');

export const certExpirySchema = z.union([
  resumeDateSchema,
  z.literal('never'),
]);
