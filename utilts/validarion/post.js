const Joi = require("joi");


const createPostSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
   authorId: Joi.string().required(),
  photo: Joi.any(),
});

const updatePostPutSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
   authorId: Joi.string(),
  photo: Joi.any(),
});
const updatePostSchema = createPostSchema.fork(
  ["title", "content"],   
  (schema) => schema.optional()
);

module.exports = {
  createPostSchema,
  updatePostPutSchema,
  updatePostSchema
};
