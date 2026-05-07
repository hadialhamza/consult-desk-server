import { IReview } from "./review.interface";
import Review from "./review.model";
import VisaService from "../visa-service/visaService.model";
import { NotFoundError, ConflictError } from "../../errors";
import mongoose from "mongoose";

const recalculateRating = async (visaServiceId: string) => {
  const stats = await Review.aggregate([
    { $match: { visaServiceId: new mongoose.Types.ObjectId(visaServiceId) } },
    {
      $group: {
        _id: "$visaServiceId",
        rating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await VisaService.findByIdAndUpdate(visaServiceId, {
      rating: parseFloat(stats[0].rating.toFixed(1)),
      totalReviews: stats[0].totalReviews,
    });
  } else {
    await VisaService.findByIdAndUpdate(visaServiceId, {
      rating: 0,
      totalReviews: 0,
    });
  }
};

const createReview = async (payload: IReview) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isExist = await Review.findOne({
      userId: payload.userId,
      visaServiceId: payload.visaServiceId,
    });

    if (isExist) {
      throw new ConflictError("You have already reviewed this service");
    }

    const result = await Review.create([payload], { session });
    
    await recalculateRating(payload.visaServiceId.toString());

    await session.commitTransaction();
    session.endSession();
    return result[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getReviewsByServiceId = async (visaServiceId: string) => {
  const result = await Review.find({ visaServiceId })
    .populate("userId", "name email")
    .sort("-createdAt")
    .lean();
  return result;
};

const deleteReview = async (id: string, userId: string, role: string) => {
  const review = await Review.findById(id);
  if (!review) throw new NotFoundError("Review not found");

  // Only the owner or an admin can delete a review
  if (review.userId.toString() !== userId && role !== "admin") {
    throw new ConflictError("You are not authorized to delete this review");
  }

  const result = await Review.findByIdAndDelete(id).lean();
  await recalculateRating(review.visaServiceId.toString());
  return result;
};

const getAllReviews = async () => {
  const result = await Review.find()
    .populate("userId", "name avatar")
    .sort("-createdAt")
    .limit(10)
    .lean();
  return result;
};

export const ReviewService = {
  createReview,
  getReviewsByServiceId,
  getAllReviews,
  deleteReview,
};
