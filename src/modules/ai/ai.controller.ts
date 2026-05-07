import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { AiService } from './ai.service';

const handleChat = catchAsync(async (req, res) => {
  const { prompt } = req.body;
  const userId = req.user!.userId;

  const result = await AiService.chat(prompt, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'AI response generated successfully',
    data: result,
  });
});

const handleChecklist = catchAsync(async (req, res) => {
  const { country, visaType } = req.body;
  const userId = req.user!.userId;

  const result = await AiService.generateChecklist(country, visaType, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Visa checklist generated successfully',
    data: result,
  });
});

const handleGenerateDescription = catchAsync(async (req, res) => {
  const { title, details } = req.body;
  const userId = req.user!.userId;

  const result = await AiService.generateDescription(title, details, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service description generated successfully',
    data: result,
  });
});

const handleReviewSummary = catchAsync(async (req, res) => {
  const { reviews } = req.body;
  const userId = req.user!.userId;

  const result = await AiService.summarizeReviews(reviews, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review summary generated successfully',
    data: result,
  });
});

export const AiController = {
  handleChat,
  handleChecklist,
  handleGenerateDescription,
  handleReviewSummary,
};
