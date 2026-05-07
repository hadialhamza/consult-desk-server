import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { CmsController } from "./cms.controller";
import { createCmsValidation, updateCmsValidation } from "./cms.validation";

const router = Router();

router.post(
  "/",
  auth("admin", "manager"),
  validateRequest(createCmsValidation),
  CmsController.createContent,
);

router.get("/", CmsController.getAllContents);

router.get("/slug/:slug", CmsController.getContentBySlug);

router.patch(
  "/:id",
  auth("admin", "manager"),
  validateRequest(updateCmsValidation),
  CmsController.updateContent,
);

router.delete(
  "/:id",
  auth("admin", "manager"),
  CmsController.deleteContent,
);

export const CmsRoutes = router;
