import { Router } from "express";
import { InitRoute } from "./init.route.js";
import { AuthRouter } from "./auth.route.js";
import { UserRouter } from "./user.route.js";
import { errorHandler } from "../middlewares/error-handler.js";
import { BASE_URL } from "../const.js";
const router = Router();

router.use(InitRoute);
router.use(BASE_URL, AuthRouter);
router.use(BASE_URL, UserRouter);

// Error Handler Route
router.use(errorHandler);

export { router as AppRoutes };
