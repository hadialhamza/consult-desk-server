import { Schema, model } from 'mongoose';
import { IAccountDocument } from './account.interface';

const accountSchema = new Schema<IAccountDocument>(
  {
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    category: { type: String, required: true, trim: true },
    date: { type: Date, required: true, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Account = model<IAccountDocument>('Account', accountSchema);
export default Account;
