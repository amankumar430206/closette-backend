import Joi from "joi";

export const userDetailsValidation = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid("M", "F", "O").required(),
  contact: Joi.string()
    .required()
    .regex(/^\d{10}$/)
    .message("Contact number must be a 10-digit numeric string")
    .trim(),
});
