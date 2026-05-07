import Newsletter from "./newsletter.model";
import { ConflictError, NotFoundError } from "../../errors";

const subscribe = async (email: string) => {
  const isExist = await Newsletter.findOne({ email });
  if (isExist) {
    if (isExist.isActive) {
      throw new ConflictError("Email already subscribed");
    } else {
      // Re-activate if previously unsubscribed
      return await Newsletter.findOneAndUpdate(
        { email },
        { isActive: true },
        { new: true }
      ).lean();
    }
  }

  const result = await Newsletter.create({ email });
  return result;
};

const unsubscribe = async (email: string) => {
  const result = await Newsletter.findOneAndUpdate(
    { email },
    { isActive: false },
    { new: true }
  ).lean();
  if (!result) throw new NotFoundError("Email not found in newsletter list");
  return result;
};

const getAllSubscribers = async () => {
  const result = await Newsletter.find().sort("-subscribedAt").lean();
  return result;
};

export const NewsletterService = {
  subscribe,
  unsubscribe,
  getAllSubscribers,
};
