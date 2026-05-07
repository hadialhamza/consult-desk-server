import { z } from 'zod';

const chatValidation = z.object({
  body: z.object({
    prompt: z.string({
      message: 'Prompt is required',
    }),
  }),
});

const checklistValidation = z.object({
  body: z.object({
    country: z.string({
      message: 'Country is required',
    }),
    visaType: z.string({
      message: 'Visa type is required',
    }),
  }),
});

const generateDescriptionValidation = z.object({
  body: z.object({
    title: z.string({
      message: 'Title is required',
    }),
    details: z.string({
      message: 'Details are required',
    }),
  }),
});

const reviewSummaryValidation = z.object({
  body: z.object({
    reviews: z.array(z.string(), {
      message: 'Reviews array is required',
    }),
  }),
});

export const AiValidation = {
  chatValidation,
  checklistValidation,
  generateDescriptionValidation,
  reviewSummaryValidation,
};
