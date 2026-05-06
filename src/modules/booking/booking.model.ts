import { Schema, model } from 'mongoose';
import { IBookingDocument } from './booking.interface';

const bookingSchema = new Schema<IBookingDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    visaServiceId: { type: Schema.Types.ObjectId, ref: 'VisaService', required: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    passportNumber: { type: String, required: true, trim: true },
    travelDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    totalFee: { type: Number, required: true, min: 0 },
    notes: { type: String },
  },
  { timestamps: true }
);

const Booking = model<IBookingDocument>('Booking', bookingSchema);
export default Booking;
