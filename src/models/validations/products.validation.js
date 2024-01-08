import Joi from "joi";

export const productValidationSchema = Joi.object({
  user: Joi.string().hex().required(), // Assuming the user is identified by its name
  closette: Joi.string().hex().empty(), // Assuming the closette is identified by its name
  category: Joi.string().empty(), // Assuming the category is identified by its name
  title: Joi.string().required(),
  description: Joi.string(),
  image: Joi.object({
    fieldname: Joi.string().required(), // Binary data of the image
    originalname: Joi.string().required(), // Binary data of the image
    buffer: Joi.binary().required(), // Binary data of the image
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(), // Mime type validation
  })
    .required()
    .unknown(true),
});
