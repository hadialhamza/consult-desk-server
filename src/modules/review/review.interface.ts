import { Document, Types } from 'mongoose';

export interface IReview {
  rating: number;
  comment: string;
  userId: Types.ObjectId;
  visaServiceId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewDocument extends IReview, Document {
  _id: Types.ObjectId;
}
