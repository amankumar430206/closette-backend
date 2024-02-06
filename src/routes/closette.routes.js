import { Router } from "express";
import ClosetteController from "../controllers/closette.controller.js";
import { VerifyToken } from "../middlewares/verifyToken.js";

const router = Router();

// admin routes
router.get("/admin/closette", ClosetteController.getAll);

// get all closettes
router.get("/clst", VerifyToken, ClosetteController.getAll);

// get all closette names of the user
router.get("/clst/names", VerifyToken, ClosetteController.getClosetteNames);

// get all categories
router.get("/clst/categories", VerifyToken, ClosetteController.getCategories);

// get by closette id
router.get("/clst/:id", VerifyToken, ClosetteController.getById);

// get closette by user id
router.get("/clst/user/:id", VerifyToken, ClosetteController.getByUserId);

// get items in a closette
router.post("/clst/products", VerifyToken, ClosetteController.create);

// create a closette
router.post("/clst/create", VerifyToken, ClosetteController.create);

// add product to closette
router.post(
  "/clst/add-product",
  VerifyToken,
  ClosetteController.assignClosetteToProduct
);

export { router as ClosetteRouter };
