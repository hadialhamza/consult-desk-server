import { IContactMessage } from "./contact.interface";
import ContactMessage from "./contact.model";
import { NotFoundError } from "../../errors";

const createMessage = async (payload: IContactMessage) => {
  const result = await ContactMessage.create(payload);
  return result;
};

const getAllMessages = async () => {
  const result = await ContactMessage.find().sort("-createdAt").lean();
  return result;
};

const markAsRead = async (id: string) => {
  const result = await ContactMessage.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  ).lean();
  if (!result) throw new NotFoundError("Message not found");
  return result;
};

export const ContactService = {
  createMessage,
  getAllMessages,
  markAsRead,
};
