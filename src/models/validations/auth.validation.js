import Joi from "joi";

export const loginValidation = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});

export const VerifyOTPValidation = Joi.object({
  email: Joi.string().email().trim().required(),
  OTP: Joi.string().trim().required(),
});

export const EmailValidation = Joi.object({
  email: Joi.string().email().trim().required(),
});
