import { Router } from "express";
import { InitRoute } from "./init.routes.js";
import { AuthRouter } from "./auth.routes.js";
import { UserRouter } from "./user.routes.js";
import { ClosetteRouter } from "./closette.routes.js";
import { ProductRouter } from "./product.routes.js";
import { CategoryRouter } from "./master/categories.routes.js";
import { NotFoundRoute } from "./notfound.routes.js";
import { StatsRouter } from "./statistics.routes.js";

import { errorHandler } from "../middlewares/error-handler.js";
import { BASE_URL } from "../const.js";
const router = Router();

router.use(InitRoute);
router.use(BASE_URL, AuthRouter);
router.use(BASE_URL, UserRouter);
router.use(BASE_URL, ClosetteRouter);
router.use(BASE_URL, ProductRouter);
router.use(BASE_URL, CategoryRouter);
router.use(BASE_URL, CategoryRouter);
router.use(BASE_URL, StatsRouter);
router.use(NotFoundRoute);

// Error Handler Route
router.use(errorHandler);

export { router as routes };
