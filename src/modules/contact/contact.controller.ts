import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ContactService } from "./contact.service";

const createMessage = catchAsync(async (req, res) => {
  const result = await ContactService.createMessage(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const getAllMessages = catchAsync(async (req, res) => {
  const result = await ContactService.getAllMessages();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Messages fetched successfully",
    data: result,
  });
});

const markAsRead = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContactService.markAsRead(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Message marked as read",
    data: result,
  });
});

export const ContactController = {
  createMessage,
  getAllMessages,
  markAsRead,
};
