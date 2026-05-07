import { Schema, model } from "mongoose";
import { INewsletter } from "./newsletter.interface";

const newsletterSchema = new Schema<INewsletter>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    isActive: { type: Boolean, default: true },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Newsletter = model<INewsletter>("Newsletter", newsletterSchema);
export default Newsletter;
