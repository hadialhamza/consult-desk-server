import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../../config";
import AiLog from "./ai.model";

const genAI = new GoogleGenerativeAI(config.gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const chat = async (prompt: string, userId: string) => {
  const systemPrompt = `You are ConsultDesk AI, a professional visa consultancy assistant. 
  Your goal is to provide accurate, helpful, and concise information about visa processes, 
  requirements for different countries (India, Thailand, UAE, Malaysia, etc.), and travel guidance. 
  If you don't know something, suggest contacting a human consultant at ConsultDesk.
  Be polite and professional.`;

  const result = await model.generateContent(
    `${systemPrompt}\n\nUser Question: ${prompt}`,
  );
  const response = result.response.text();

  // Log the AI interaction if userId is present
  if (userId) {
    await AiLog.create({
      userId,
      type: "chat",
      prompt,
      response,
    });
  }

  return response;
};

const generateChecklist = async (
  country: string,
  visaType: string,
  userId: string,
) => {
  const prompt = `Generate a comprehensive visa document checklist for ${country} ${visaType} visa.
  Return the response in a structured JSON format with three categories: 
  "required" (mandatory documents), "optional" (supporting documents), and "warnings" (important tips).
  Each category should be an array of simple strings (descriptions).
  Only return the JSON object, nothing else.`;

  const result = await model.generateContent(prompt);
  let response = result.response.text();

  // Clean potential markdown formatting from AI response
  response = response.replace(/```json|```/g, "").trim();

  // Log the AI interaction if userId is present
  if (userId) {
    await AiLog.create({
      userId,
      type: "checklist",
      prompt: `${country} ${visaType} checklist`,
      response,
      metadata: { country, visaType },
    });
  }

  return JSON.parse(response);
};

const generateDescription = async (
  title: string,
  details: string,
  userId: string,
) => {
  const prompt = `Write a professional and engaging service description for a visa service titled "${title}".
  Use the following details: ${details}.
  The description should highlight the benefits, ease of process, and why customers should choose ConsultDesk.
  Keep it around 150-200 words.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  // Log the AI interaction
  await AiLog.create({
    userId,
    type: "content-generation",
    prompt: `Generate description for: ${title}`,
    response,
  });

  return response;
};

const summarizeReviews = async (reviews: string[], userId: string) => {
  const reviewsText = reviews.join("\n- ");
  const prompt = `Summarize the following customer reviews for a visa service to give potential customers a quick overview of what to expect.
  Highlight positive points and mention any common concerns if present.
  Keep it very concise (max 100 words).
  
  Reviews:
  - ${reviewsText}`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  // Log the AI interaction
  await AiLog.create({
    userId,
    type: "review-summary",
    prompt: `Summarize ${reviews.length} reviews`,
    response,
  });

  return response;
};

export const AiService = {
  chat,
  generateChecklist,
  generateDescription,
  summarizeReviews,
};
