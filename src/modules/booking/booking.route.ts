import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { BookingController } from "./booking.controller";
import { 
  createBookingValidation, 
  updateBookingStatusValidation 
} from "./booking.validation";

const router = Router();

router.post(
  "/",
  auth("admin", "manager", "employee", "user"),
  validateRequest(createBookingValidation),
  BookingController.createBooking,
);

router.get(
  "/",
  auth("admin", "manager", "employee"),
  BookingController.getAllBookings,
);

router.get(
  "/:id",
  auth("admin", "manager", "employee", "user"),
  BookingController.getBookingById,
);

router.patch(
  "/:id",
  auth("admin", "manager", "employee"),
  validateRequest(updateBookingStatusValidation),
  BookingController.updateBooking,
);

router.delete(
  "/:id",
  auth("admin", "manager"),
  BookingController.deleteBooking,
);

export const BookingRoutes = router;
