const Joi = require("joi");

const signupschema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().min(3).optional(),
  password: Joi.string().min(8).optional(),
  age: Joi.number().optional(),
  images: Joi.any(), 
});

const loginschema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).optional(),
});

module.exports = {
  signupschema,
    loginschema
};