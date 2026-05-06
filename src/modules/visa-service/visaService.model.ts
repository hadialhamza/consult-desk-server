import { Schema, model } from 'mongoose';
import { IVisaServiceDocument } from './visaService.interface';
import { VISA_TYPES, VISA_CATEGORIES } from './visaService.constant';

const visaServiceSchema = new Schema<IVisaServiceDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
    visaType: { type: String, enum: VISA_TYPES, required: true },
    fee: { type: Number, required: true, min: 0 },
    processingTime: { type: String, required: true },
    requirements: [{ type: String }],
    category: { type: String, enum: VISA_CATEGORIES, default: 'standard' },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const VisaService = model<IVisaServiceDocument>('VisaService', visaServiceSchema);
export default VisaService;
