import { Schema, model } from 'mongoose';
import { IAiLogDocument } from './ai.interface';

const aiLogSchema = new Schema<IAiLogDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['chat', 'checklist', 'content-generation', 'review-summary'],
      required: true,
    },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const AiLog = model<IAiLogDocument>('AiLog', aiLogSchema);
export default AiLog;
