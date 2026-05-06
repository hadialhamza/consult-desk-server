import { Document, Types } from 'mongoose';

export interface IBooking {
  userId: Types.ObjectId;
  visaServiceId: Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  passportNumber: string;
  travelDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalFee: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookingDocument extends IBooking, Document {
  _id: Types.ObjectId;
}
