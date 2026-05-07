import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { ContactController } from "./contact.controller";
import { createContactMessageValidation } from "./contact.validation";

const router = Router();

router.post(
  "/",
  validateRequest(createContactMessageValidation),
  ContactController.createMessage,
);

router.get(
  "/",
  auth("admin", "manager"),
  ContactController.getAllMessages,
);

router.patch(
  "/:id/read",
  auth("admin", "manager"),
  ContactController.markAsRead,
);

export const ContactRoutes = router;
