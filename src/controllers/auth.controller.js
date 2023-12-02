import { Users } from "../models/Users.js";
import { Auth } from "../models/Auth.js";
import { loginValidation } from "../models/validations/auth.validation.js";
import { triggerEmail } from "../services/sendEmail.js";
import OtpGenerator from "otp-generator";

export default {
  // sign-in
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { error } = loginValidation.validate(req.body);
      if (error)
        return res.status(400).json({
          msg: error.details[0].message,
          success: false,
        });

      // find user with email
      let user = await Users.findOne({ email });

      if (!user) {
        return res.status(401).json({
          msg: "Invalid Credentials",
          success: false,
        });
      }

      const passwordMatched =
        password === user.password || (await user.verifyPassword(password));

      if (!passwordMatched)
        return res.status(401).json({
          success: false,
          msg: "Invalid Password.. Please try Again",
        });

      // generating a token
      const token = user.generateToken();

      res.status(200).json({
        success: true,
        msg: "token generated successfully",
        token,
      });
    } catch (err) {
      next(err);
    }
  },

  // send one time password, for OTP verificatino page
  sendOTP: async (req, res, next) => {
    try {
      // validate email
      const generatedOTP = OtpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });

      const emailSent = await triggerEmail({
        to: "aman.vishwakarma.dev@gmail.com",
        OTP: generatedOTP,
      });

      // set OTP for the user
      let updated = await Users.updateOne(
        {
          email: req.body.email,
        },
        { otp: generatedOTP }, // generate a new OTP everytime
        { upsert: true }
      );

      res.status(200).json({
        success: true,
        msg: "OTP sent successfully, check your email",
        updated,
      });
    } catch (err) {
      next(err);
    }
  },

  // OTP verfication
  verifyOTP: async (req, res, next) => {
    try {
      const { OTP } = req.body;

      if (!OTP)
        return res.status(400).json({
          msg: "bad request",
          success: false,
        });

      let user = await Users.findOne({ email: req.body.email });

      const verified = user.verifyOTP(OTP);

      if (!verified)
        res.status(400).json({
          success: true,
          msg: "invalid OTP",
          verified,
        });

      // generating a token
      const token = user.generateToken();

      res.status(200).json({
        success: true,
        msg: "OTP verified successfully",
        token,
      });
    } catch (err) {
      next(err);
    }
  },
};
