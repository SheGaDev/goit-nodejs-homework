const Joi = require("joi");

const usersSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const avatarsSchema = Joi.object({
  avatarURL: Joi.any().required(),
});

module.exports = { usersSchema, emailSchema, avatarsSchema };
