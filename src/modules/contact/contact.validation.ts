import { z } from "zod";

export const createContactMessageValidation = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }),
    email: z.string({ message: "Email is required" }).email("Invalid email"),
    phone: z.string().optional(),
    subject: z.string({ message: "Subject is required" }),
    message: z.string({ message: "Message is required" }),
  }),
});
