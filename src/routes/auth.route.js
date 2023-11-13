import { Router } from "express";
import { AUTH_ROUTES } from "./urlConfig.js";
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
router.post(AUTH_ROUTES.LOGIN, (req, res) => {
  res.status(200).json({
    msg: "user logged in successfuly",
    success: true,
  });
});

// sign-up
router.post(AUTH_ROUTES.REGISTER, (req, res) => {
  res.status(200).json({
    msg: "user reistered successfuly",
    success: true,
  });
});

export { router as AuthRouter };
