import { Router } from "express";
import UserConroller from "../controllers/users.controller.js";

const router = Router();

// get users list
router.get("/users", UserConroller.USERS);

// get single user detail
router.get("/users/:id", UserConroller.USER);

export { router as UserRouter };
