import { Schema, model } from 'mongoose';
import { IClientDocument } from './client.interface';

const clientSchema = new Schema<IClientDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    passportNumber: { type: String, required: true, trim: true },
    passportExpiry: { type: Date, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
    visaType: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
    status: {
      type: String,
      enum: ['new', 'processing', 'approved', 'rejected'],
      default: 'new',
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Client = model<IClientDocument>('Client', clientSchema);
export default Client;
