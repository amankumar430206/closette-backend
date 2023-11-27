import Joi from "joi";

export const loginValidation = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});
