import { z } from "zod";

export const createReviewValidation = z.object({
  body: z.object({
    rating: z.number({ message: "Rating is required" }).min(1).max(5),
    comment: z.string({ message: "Comment is required" }).min(10, "Comment must be at least 10 characters"),
    visaServiceId: z.string({ message: "Visa service ID is required" }),
  }),
});
