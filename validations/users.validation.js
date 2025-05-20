const Joi = require("joi");

const postUser = Joi.object({
    user_id: Joi.string().min(3).required(),
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().integer().min(0)
}).strict();

const getUser = Joi.object({
    user_id: Joi.string().allow(null,'')
}).strict();

const loginUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).strict();

const updateUser = Joi.object({
    user_id: Joi.string().min(3).required(),
    name: Joi.string().allow(null, ''),
    email: Joi.string().email().required(),
    password: Joi.string().allow(null, ''),
    age: Joi.number().integer().allow(null, '')
});

module.exports = {
    postUser,
    getUser,
    loginUser,
    updateUser
};
