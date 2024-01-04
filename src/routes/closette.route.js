import { Router } from "express";
import ClosetteController from "../controllers/closette.controller.js";
import { VerifyToken } from "../middlewares/verifyToken.js";

const router = Router();

// get all closettes
router.get("/clst", VerifyToken, ClosetteController.getAll);

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
