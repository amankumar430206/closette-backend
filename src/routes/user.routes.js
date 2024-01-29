import { Router } from "express";
import UserConroller from "../controllers/users.controller.js";
import { VerifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/fileUpload.js";

const router = Router();

// get users list
router.get("/users", UserConroller.USERS);

// get single user detail
router.get("/users/:id", VerifyToken, UserConroller.USER);

// update user profile
router.put("/users/:id/update", VerifyToken, UserConroller.UPDATE_USER);

// update user profile image
router.patch(
  "/users/:id/update/image",
  VerifyToken,
  upload.single("photo"),
  UserConroller.UPDATE_PHOTO
);

export { router as UserRouter };
