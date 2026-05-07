import { z } from "zod";

export const subscribeNewsletterValidation = z.object({
  body: z.object({
    email: z.string({ message: "Email is required" }).email("Invalid email"),
  }),
});
