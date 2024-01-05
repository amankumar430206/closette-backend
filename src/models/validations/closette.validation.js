import Joi from "joi";

export const closetteValidatiion = Joi.object({
  user: Joi.string(),
  name: Joi.string().min(3).max(255).trim().required(),
  description: Joi.string().max(255).trim(),
});
