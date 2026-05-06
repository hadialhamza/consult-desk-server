import { Document, Types } from 'mongoose';

export interface ICountry {
  name: string;
  code: string;
  flag: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICountryDocument extends ICountry, Document {
  _id: Types.ObjectId;
}
