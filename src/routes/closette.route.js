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

// create a closette
router.post("/clst/create", VerifyToken, ClosetteController.create);

export { router as ClosetteRouter };
