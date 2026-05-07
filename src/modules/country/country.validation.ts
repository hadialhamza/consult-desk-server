import { z } from 'zod';

export const createCountryValidation = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    code: z.string({ message: 'Country code is required' }),
    flag: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateCountryValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    code: z.string().optional(),
    flag: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});
