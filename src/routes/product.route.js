import { Router } from "express";
import Controller from "../controllers/products.controller.js";
import { VerifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/fileUpload.js";

const router = Router();

// get all products
router.get("/products", VerifyToken, Controller.getAll);

// get product by id
router.get("/products/:id", VerifyToken, Controller.getById);

// get all products of user
router.get("/products/user", VerifyToken, Controller.getByUserId);

// add product
router.post("/products/add", VerifyToken, Controller.createProduct);

// update product
router.put("/products/:id/update", VerifyToken, Controller.getByUserId);

// update product image
router.patch(
  "/products/update/image",
  VerifyToken,
  upload.single("image"),
  Controller.getByUserId
);

// delete product by id
router.delete("/products/:id", VerifyToken, Controller.removeById);

export { router as ProductRouter };
