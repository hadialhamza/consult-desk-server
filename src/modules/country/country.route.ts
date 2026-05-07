import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { CountryController } from "./country.controller";
import {
  createCountryValidation,
  updateCountryValidation,
} from "./country.validation";

const router = Router();

router.post(
  "/",
  auth("admin", "manager"),
  validateRequest(createCountryValidation),
  CountryController.createCountry,
);

router.get("/", CountryController.getAllCountries);

router.get("/:id", CountryController.getCountryById);

router.patch(
  "/:id",
  auth("admin", "manager"),
  validateRequest(updateCountryValidation),
  CountryController.updateCountry,
);

router.delete(
  "/:id",
  auth("admin", "manager"),
  CountryController.deleteCountry,
);

export const CountryRoutes = router;
