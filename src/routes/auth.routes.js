import { Router } from "express";
import { AUTH_ROUTES } from "./urlConfig.js";
import AuthController from "../controllers/auth.controller.js";
import { VerifyToken } from "../middlewares/verifyToken.js";

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

router.post(AUTH_ROUTES.LOGIN, AuthController.login);
router.post(AUTH_ROUTES.OTP_SEND, AuthController.sendOTP);
router.post(AUTH_ROUTES.OTP_VERIFY, AuthController.verifyOTP);

export { router as AuthRouter };
