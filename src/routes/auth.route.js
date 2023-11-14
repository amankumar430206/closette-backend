import { Router } from "express";
import { AUTH_ROUTES } from "./urlConfig.js";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

/**
 * user - login flow
 * login
 * send JWT token
 *
 * generate OTP (token)
 * send OTP to email / mobile
 *
 * verify OTP
 * send user details
 */

// sign-in
router.post(AUTH_ROUTES.LOGIN, AuthController.LOGIN);

// sign-up
router.post(AUTH_ROUTES.REGISTER, AuthController.REGISTER);

export { router as AuthRouter };
