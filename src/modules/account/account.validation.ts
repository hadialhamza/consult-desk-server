import { z } from "zod";

export const createAccountValidation = z.object({
  body: z.object({
    type: z.enum(["income", "expense"], { message: "Type must be income or expense" }),
    title: z.string({ message: "Title is required" }),
    amount: z.number({ message: "Amount is required" }).min(0),
    description: z.string().optional(),
    category: z.string({ message: "Category is required" }),
    date: z.string().optional(),
  }),
});
