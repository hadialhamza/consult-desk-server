import { Document, Types } from 'mongoose';
import { TAccountType } from '../../types';

export interface IAccount {
  type: TAccountType;
  title: string;
  amount: number;
  description?: string;
  category: string;
  date: Date;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountDocument extends IAccount, Document {
  _id: Types.ObjectId;
}
