import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { NewsletterController } from "./newsletter.controller";
import { subscribeNewsletterValidation } from "./newsletter.validation";

const router = Router();

router.post(
  "/subscribe",
  validateRequest(subscribeNewsletterValidation),
  NewsletterController.subscribe,
);

router.post(
  "/unsubscribe",
  validateRequest(subscribeNewsletterValidation),
  NewsletterController.unsubscribe,
);

router.get(
  "/",
  auth("admin", "manager"),
  NewsletterController.getAllSubscribers,
);

export const NewsletterRoutes = router;
