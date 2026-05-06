import { z } from 'zod';

export const registerValidation = z.object({
  body: z.object({
    name: z.string({ error: 'Name is required' }).min(2).max(100),
    email: z.string({ error: 'Email is required' }).email(),
    password: z.string({ error: 'Password is required' }).min(6),
    phone: z.string().optional(),
  }),
});

export const loginValidation = z.object({
  body: z.object({
    email: z.string({ error: 'Email is required' }).email(),
    password: z.string({ error: 'Password is required' }),
  }),
});

export const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({ error: 'Refresh token is required' }),
  }),
});
