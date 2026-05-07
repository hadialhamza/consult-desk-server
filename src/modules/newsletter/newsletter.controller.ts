import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { NewsletterService } from "./newsletter.service";

const subscribe = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await NewsletterService.subscribe(email);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Subscribed to newsletter successfully",
    data: result,
  });
});

const unsubscribe = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await NewsletterService.unsubscribe(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Unsubscribed from newsletter successfully",
    data: result,
  });
});

const getAllSubscribers = catchAsync(async (req, res) => {
  const result = await NewsletterService.getAllSubscribers();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Newsletter subscribers fetched successfully",
    data: result,
  });
});

export const NewsletterController = {
  subscribe,
  unsubscribe,
  getAllSubscribers,
};
