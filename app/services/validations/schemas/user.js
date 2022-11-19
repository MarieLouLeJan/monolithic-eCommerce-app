import Joi from 'joi';

const frenchPattern = /^[a-zA-Z0-9Ã-ÿ '"°-]+$/;
const namePattern = /^[a-zA-Z\-]+$/;

const user = {
    firstname: Joi.string().pattern(namePattern).min(2),
    lastname: Joi.string().pattern(namePattern).min(2),
    email: Joi.string().email().min(4),
    password: Joi.string(),
    active: Joi.boolean(),
    role_id: Joi.number().min(1)
};

export const userChanged = Joi.object(user);

export const userCreated = Joi.object(user).fork(Object.keys(user), (schema) => schema.required())