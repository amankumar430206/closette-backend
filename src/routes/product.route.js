import { Router } from "express";
import Controller from "../controllers/products.controller.js";
import { VerifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/fileUpload.js";

const router = Router();

// get all products [admin]
router.get("/products", Controller.getAll);

// filter products by user or closette
router.get("/products/filter", VerifyToken, Controller.filterProducts);

// get product by product id
router.get("/products/:id", VerifyToken, Controller.getById);

// get all products of the user
router.get("/products/user/:id", VerifyToken, Controller.getByUserId);

// get all products of the closette
router.get("/products/closette/:id", VerifyToken, Controller.getByClosetteId);

// add product
router.post(
  "/products/add",
  VerifyToken,
  upload.single("image"),
  Controller.addProduct
);

// assign closette to product
router.put("/products/assign/closette", VerifyToken, Controller.assignClosette);

// update product
router.put("/products/:id", VerifyToken, Controller.getByUserId);

// update product image
router.patch(
  "/products/update/image",
  VerifyToken,
  upload.single("image"),
  Controller.getByUserId
);

// delete product by id
router.delete("/products/:id", VerifyToken, Controller.removeById);

router.get("/image/:imageName", VerifyToken, Controller.getImageFromS3);

export { router as ProductRouter };
