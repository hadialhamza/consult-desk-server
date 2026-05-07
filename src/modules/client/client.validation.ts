import { z } from 'zod';

export const createClientValidation = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    email: z.string({ message: 'Email is required' }).email('Invalid email address'),
    phone: z.string({ message: 'Phone is required' }),
    passportNumber: z.string({ message: 'Passport number is required' }),
    passportExpiry: z.string({ message: 'Passport expiry date is required' }),
    dateOfBirth: z.string({ message: 'Date of birth is required' }),
    nationality: z.string({ message: 'Nationality is required' }),
    address: z.string({ message: 'Address is required' }),
    visaType: z.string({ message: 'Visa type is required' }),
    country: z.string({ message: 'Country is required' }),
    status: z.enum(['new', 'processing', 'approved', 'rejected']).optional(),
    assignedTo: z.string().optional(),
    notes: z.array(z.string()).optional(),
  }),
});

export const updateClientValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    passportNumber: z.string().optional(),
    passportExpiry: z.string().optional(),
    dateOfBirth: z.string().optional(),
    nationality: z.string().optional(),
    address: z.string().optional(),
    visaType: z.string().optional(),
    country: z.string().optional(),
    status: z.enum(['new', 'processing', 'approved', 'rejected']).optional(),
    assignedTo: z.string().optional(),
    notes: z.array(z.string()).optional(),
  }),
});
