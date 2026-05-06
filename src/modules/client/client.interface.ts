import { Document, Types } from 'mongoose';
import { TApplicationStatus } from '../../types';

export interface IClient {
  name: string;
  email: string;
  phone: string;
  passportNumber: string;
  passportExpiry: Date;
  dateOfBirth: Date;
  nationality: string;
  address: string;
  visaType: string;
  country: Types.ObjectId;
  status: TApplicationStatus;
  assignedTo?: Types.ObjectId;
  notes: string[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClientDocument extends IClient, Document {
  _id: Types.ObjectId;
}
