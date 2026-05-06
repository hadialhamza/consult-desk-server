import { Schema, model } from 'mongoose';
import { IReviewDocument } from './review.interface';

const reviewSchema = new Schema<IReviewDocument>(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    visaServiceId: { type: Schema.Types.ObjectId, ref: 'VisaService', required: true },
  },
  { timestamps: true }
);

// Prevent duplicate reviews from same user on same service
reviewSchema.index({ userId: 1, visaServiceId: 1 }, { unique: true });

const Review = model<IReviewDocument>('Review', reviewSchema);
export default Review;
