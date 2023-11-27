import { Router } from "express";
import CategoryController from "../../controllers/categories.controller.js";
import { VerifyToken } from "../../middlewares/verifyToken.js";

const router = Router();

// get all closettes
router.get("/category", VerifyToken, CategoryController.getAll);
router.post("/category/add", VerifyToken, CategoryController.addCategories);
router.post(
  "/category/remove/:id",
  VerifyToken,
  CategoryController.addCategories
);

export { router as CategoryRouter };
