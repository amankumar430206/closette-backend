import Joi from "joi";

export const productValidationSchema = Joi.object({
  title: Joi.string().required(),
  user: Joi.string().hex().required(), // Assuming the category is identified by its name
  category: Joi.string().hex().required(), // Assuming the category is identified by its name
  image: Joi.string().required(),
  brand: Joi.string().required(),
  price: Joi.number(),
  description: Joi.string(),
  color: Joi.string(),
  size: Joi.string(),
  quantity: Joi.number().default(0),
  ratings: Joi.number().default(0).max(5),
  features: Joi.array().items(Joi.string()),
});
