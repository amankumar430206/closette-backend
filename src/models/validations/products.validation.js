import Joi from "joi";

export const imagesValidationSchema = Joi.array()
  .items(
    Joi.object({
      size: Joi.number()
        .max(3 * 1024 * 1024)
        .message("File size must not exceed (3 MB)")
        .required(),
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      buffer: Joi.binary().required(),
      mimetype: Joi.string().required(), // Mime type validation
    })
      .required()
      .unknown(true)
  )
  .min(1)
  .required();

export const productValidationSchema = Joi.object({
  user: Joi.string().hex().required(), // Assuming the user is identified by its name
  closette: Joi.string().hex().empty(), // Assuming the closette is identified by its name
  category: Joi.string().empty(), // Assuming the category is identified by its name
  title: Joi.string().required(),
  description: Joi.string(),
  image: imagesValidationSchema,
});

export const imageValidationSchema = Joi.object({
  size: Joi.number()
    .max(3 * 1024 * 1024)
    .message("File size must not exceed (3 MB)")
    .required(),
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  buffer: Joi.binary().required(),
  mimetype: Joi.string().required(), // Mime type validation
})
  .required()
  .unknown(true);
