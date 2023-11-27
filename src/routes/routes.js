import { Router } from "express";
import { InitRoute } from "./init.route.js";
import { AuthRouter } from "./auth.route.js";
import { UserRouter } from "./user.route.js";
import { ClosetteRouter } from "./closette.route.js";
import { ProductRouter } from "./product.route.js";
import { CategoryRouter } from "./master/categories.route.js";
import { NotFoundRoute } from "./notfound.route.js";

import { errorHandler } from "../middlewares/error-handler.js";
import { BASE_URL } from "../const.js";
const router = Router();

router.use(InitRoute);
router.use(BASE_URL, AuthRouter);
router.use(BASE_URL, UserRouter);
router.use(BASE_URL, ClosetteRouter);
router.use(BASE_URL, ProductRouter);
router.use(BASE_URL, CategoryRouter);
router.use(NotFoundRoute);

// Error Handler Route
router.use(errorHandler);

export { router as routes };
