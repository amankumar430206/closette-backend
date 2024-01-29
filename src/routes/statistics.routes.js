import { Router } from "express";
import StatsController from "../controllers/statsitics.controller.js";

const router = Router();

// get all closettes
router.get("/stats", StatsController.GetDashboardStats);

export { router as StatsRouter };
