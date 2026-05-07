import { Types } from "mongoose";

export interface IContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
