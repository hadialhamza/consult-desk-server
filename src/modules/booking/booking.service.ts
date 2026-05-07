import { IBooking } from "./booking.interface";
import Booking from "./booking.model";
import { IQueryFilters } from "../../types";
import { NotFoundError } from "../../errors";

const createBooking = async (payload: IBooking) => {
  const result = await Booking.create(payload);
  return result;
};

const getAllBookings = async (filters: IQueryFilters) => {
  const { page = 1, limit = 10, sort = "-createdAt", ...filterData } = filters;

  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    Booking.find(filterData)
      .populate("userId", "name email")
      .populate("visaServiceId", "title country fee")
      .sort(sort as string)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Booking.countDocuments(filterData),
  ]);

  return {
    data,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

const getBookingById = async (id: string) => {
  const result = await Booking.findById(id)
    .populate("userId", "name email")
    .populate("visaServiceId", "title country fee")
    .lean();
  if (!result) throw new NotFoundError("Booking not found");
  return result;
};

const updateBooking = async (id: string, payload: Partial<IBooking>) => {
  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!result) throw new NotFoundError("Booking not found");
  return result;
};

const deleteBooking = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id).lean();
  if (!result) throw new NotFoundError("Booking not found");
  return result;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
