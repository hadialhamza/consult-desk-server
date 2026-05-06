import { z } from 'zod';

export const createUserValidation = z.object({
  body: z.object({
    name: z.string({ error: 'Name is required' }).min(2).max(100),
    email: z.string({ error: 'Email is required' }).email(),
    password: z.string({ error: 'Password is required' }).min(6),
    phone: z.string().optional(),
    role: z.enum(['admin', 'manager', 'employee', 'user']).optional(),
  }),
});

export const updateUserValidation = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    phone: z.string().optional(),
    avatar: z.string().url().optional(),
  }),
});

export const updateUserRoleValidation = z.object({
  body: z.object({
    userId: z.string({ error: 'User ID is required' }),
    role: z.enum(['admin', 'manager', 'employee', 'user'], {
      error: 'Role is required',
    }),
  }),
});
