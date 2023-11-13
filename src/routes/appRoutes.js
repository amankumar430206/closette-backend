import { Router } from "express";
import { InitRoute } from "./init.route.js";
import { AuthRouter } from "./auth.route.js";
import { errorHandler } from "../middlewares/error-handler.js";

const router = Router();

router.use(InitRoute);
router.use(AuthRouter);

// Error Handler Route
router.use(errorHandler);

export { router as AppRoutes };
