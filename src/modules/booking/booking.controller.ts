import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { BookingService } from "./booking.service";
import pick from "../../shared/pick";

const createBooking = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const result = await BookingService.createBooking({
    ...req.body,
    userId,
  });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["status", "userId", "visaServiceId"]);
  const result = await BookingService.getAllBookings(filters);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Bookings fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getBookingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.getBookingById(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking fetched successfully",
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.updateBooking(id as string, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking updated successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BookingService.deleteBooking(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking deleted successfully",
    data: null,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
