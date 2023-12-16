import Joi from "joi";

export const closetteValidatiion = Joi.object({
  name: Joi.string().min(3).max(255).trim().required(),
  location: Joi.string().trim(),
  description: Joi.string().max(255).trim(),
  user: Joi.string(),
  sections: Joi.array(),
});
