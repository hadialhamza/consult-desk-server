import { Router } from "express";
import auth from "../../middleware/auth";
import { DashboardController } from "./dashboard.controller";

const router = Router();

router.get(
  "/stats",
  auth("admin", "manager"),
  DashboardController.getStats,
);

router.get(
  "/chart-data",
  auth("admin", "manager"),
  DashboardController.getChartData,
);

export const DashboardRoutes = router;
