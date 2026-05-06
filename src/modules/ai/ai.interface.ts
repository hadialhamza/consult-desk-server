import { Document, Types } from 'mongoose';

export interface IAiLog {
  userId: Types.ObjectId;
  type: 'chat' | 'checklist' | 'content-generation' | 'review-summary';
  prompt: string;
  response: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface IAiLogDocument extends IAiLog, Document {
  _id: Types.ObjectId;
}
