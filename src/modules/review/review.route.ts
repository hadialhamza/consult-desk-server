import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { ReviewController } from "./review.controller";
import { createReviewValidation } from "./review.validation";

const router = Router();

router.post(
  "/",
  auth("admin", "manager", "employee", "user"),
  validateRequest(createReviewValidation),
  ReviewController.createReview,
);

router.get("/", ReviewController.getAllReviews);

router.get("/visa-service/:visaServiceId", ReviewController.getReviewsByServiceId);

router.delete("/:id", auth("admin", "user"), ReviewController.deleteReview);

export const ReviewRoutes = router;
