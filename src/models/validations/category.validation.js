import Joi from "joi";

export const CategoryValidation = Joi.object({
  name: Joi.string().min(3).max(50).trim().required(),
  description: Joi.string().min(3).max(255).trim(),
  parentCategory: Joi.string().hex(),
});
