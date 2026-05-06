import { Document, Types } from 'mongoose';

export interface IVisaService {
  title: string;
  description: string;
  image: string;
  country: Types.ObjectId;
  visaType: string;
  fee: number;
  processingTime: string;
  requirements: string[];
  category: string;
  rating: number;
  totalReviews: number;
  isActive: boolean;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVisaServiceDocument extends IVisaService, Document {
  _id: Types.ObjectId;
}
