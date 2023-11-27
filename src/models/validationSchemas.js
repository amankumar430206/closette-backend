import Joi from "joi";

function validateClosette(payload) {
  const schema = Joi.object({
    name: Joi.string().required(),
    owner: Joi.required(),
  });
  return schema.validate(payload);
}

function validateUser(payload) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(payload);
}

module.exports = { validateClosette, validateUser };
