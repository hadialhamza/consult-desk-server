import { z } from "zod";

export const createCmsValidation = z.object({
  body: z.object({
    type: z.enum(["blog", "faq", "page"], { message: "Type must be blog, faq, or page" }),
    title: z.string({ message: "Title is required" }),
    content: z.string({ message: "Content is required" }),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const updateCmsValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isPublished: z.boolean().optional(),
  }),
});
