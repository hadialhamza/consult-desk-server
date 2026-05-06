import { z } from 'zod';

export const createVisaServiceValidation = z.object({
  body: z.object({
    title: z.string({ error: 'Title is required' }),
    description: z.string({ error: 'Description is required' }),
    image: z.string().optional(),
    country: z.string({ error: 'Country is required' }),
    visaType: z.enum(['tourist', 'medical', 'business', 'student', 'work', 'transit', 'e-visa']),
    fee: z.number({ error: 'Fee is required' }).min(0),
    processingTime: z.string({ error: 'Processing time is required' }),
    requirements: z.array(z.string()).optional(),
    category: z.enum(['standard', 'express', 'urgent']).optional(),
  }),
});

export const updateVisaServiceValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    fee: z.number().min(0).optional(),
    processingTime: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    category: z.enum(['standard', 'express', 'urgent']).optional(),
    isActive: z.boolean().optional(),
  }),
});
