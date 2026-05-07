import { Schema, model } from "mongoose";
import { IContactMessage } from "./contact.interface";

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ContactMessage = model<IContactMessage>("ContactMessage", contactMessageSchema);
export default ContactMessage;
