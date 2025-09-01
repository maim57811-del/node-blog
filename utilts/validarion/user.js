const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().optional(),
  bio: Joi.string().optional(),
  password: Joi.string().required(),
  image: Joi.any(),
  role: Joi.string().valid('user', 'admin').required()
});

const updateUserPutSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  age: Joi.number().required(),
  bio: Joi.string().optional(),
  image: Joi.any(),
  role: Joi.string().valid('user', 'admin').required()
});


const updateUserPatchSchema = updateUserPutSchema.fork(
  ["name", "email", "password", "age", "bio", "image"],
  (schema) => schema.optional()
);

module.exports = {
  createUserSchema,
  updateUserPutSchema,
  updateUserPatchSchema,
};

