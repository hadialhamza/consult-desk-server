import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const result = await ReviewService.createReview({
    ...req.body,
    userId,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Review submitted successfully",
    data: result,
  });
});

const getReviewsByServiceId = catchAsync(async (req, res) => {
  const { visaServiceId } = req.params;
  const result = await ReviewService.getReviewsByServiceId(visaServiceId as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user!;
  
  await ReviewService.deleteReview(id as string, userId, role);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Review deleted successfully",
    data: null,
  });
});

export const ReviewController = {
  createReview,
  getReviewsByServiceId,
  deleteReview,
};
