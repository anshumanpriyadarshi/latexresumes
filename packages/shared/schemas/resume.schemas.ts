import { z } from 'zod';
import {
  emailSchema,
  phoneSchema,
  httpUrlSchema,
  resumeDateSchema,
  certExpirySchema,
} from './primitives.schemas';

export const bulletPointSchema = z.object({
  id:      z.string().min(1),
  content: z.string(),
});

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:  z.string().min(1, 'Last name is required'),
  email:     emailSchema,
  phone:     phoneSchema,
  linkedin:  httpUrlSchema,
  github:    httpUrlSchema,
  website:   httpUrlSchema.optional(),
  location:  z.string().min(1, 'Location is required'),
});

export const experienceSchema = z.object({
  id:        z.string(),
  role:      z.string().min(1),
  company:   z.string().min(1),
  location:  z.string(),
  startDate: resumeDateSchema,
  endDate:   resumeDateSchema,
  bullets:   z.array(bulletPointSchema),
});

export const educationSchema = z.object({
  id:          z.string(),
  institution: z.string().min(1),
  degree:      z.string().min(1),
  field:       z.string().min(1),
  startDate:   resumeDateSchema,
  endDate:     resumeDateSchema,
  gpa:         z.string().optional(),
  honors:      z.string().optional(),
});

export const skillCategorySchema = z.object({
  id:       z.string(),
  category: z.string().min(1),
  items:    z.array(z.string().min(1)),
});

export const projectSchema = z.object({
  id:        z.string(),
  name:      z.string().min(1),
  techStack: z.array(z.string()),
  liveUrl:   httpUrlSchema.optional(),
  repoUrl:   httpUrlSchema.optional(),
  startDate: resumeDateSchema,
  endDate:   resumeDateSchema,
  bullets:   z.array(bulletPointSchema),
});

export const certificationSchema = z.object({
  id:           z.string(),
  name:         z.string().min(1),
  issuer:       z.string().min(1),
  issueDate:    resumeDateSchema,
  expiryDate:   certExpirySchema,
  credentialId: z.string().optional(),
  url:          httpUrlSchema.optional(),
});

export const resumeContentSchema = z.object({
  personal:       personalInfoSchema,
  experience:     z.array(experienceSchema),
  education:      z.array(educationSchema),
  skills:         z.array(skillCategorySchema),
  projects:       z.array(projectSchema),
  certifications: z.array(certificationSchema),
});
