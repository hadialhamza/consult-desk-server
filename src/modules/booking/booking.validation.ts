import { z } from "zod";

export const createBookingValidation = z.object({
  body: z.object({
    visaServiceId: z.string({ message: "Visa service ID is required" }),
    fullName: z.string({ message: "Full name is required" }),
    email: z.string({ message: "Email is required" }).email("Invalid email address"),
    phone: z.string({ message: "Phone is required" }),
    passportNumber: z.string({ message: "Passport number is required" }),
    travelDate: z.string({ message: "Travel date is required" }),
    totalFee: z.number({ message: "Total fee is required" }).min(0),
    notes: z.string().optional(),
  }),
});

export const updateBookingStatusValidation = z.object({
  body: z.object({
    status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
  }),
});
