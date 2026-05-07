import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { AccountController } from "./account.controller";
import { createAccountValidation } from "./account.validation";

const router = Router();

router.post(
  "/",
  auth("admin", "manager"),
  validateRequest(createAccountValidation),
  AccountController.createAccountEntry,
);

router.get(
  "/",
  auth("admin", "manager"),
  AccountController.getAllAccountEntries,
);

router.get(
  "/summary",
  auth("admin", "manager"),
  AccountController.getAccountSummary,
);

export const AccountRoutes = router;
