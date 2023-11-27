import Joi from "joi";

export const userDetailsValidation = Joi.object({
  username: Joi.string().min(2).max(30).trim().required(),
  name: Joi.string().min(2).max(50).trim().required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid("M", "F", "O").required(),
  contact: Joi.string()
    .regex(/^\d{10}$/)
    .trim()
    .message("Contact number must be a 10-digit numeric string")
    .required(),
});
