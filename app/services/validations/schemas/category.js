import Joi from 'joi';

const frenchPattern = /^[a-zA-Z0-9Ã-ÿ '"°-]+$/;

const category = {
    title: Joi.string().pattern(frenchPattern).min(2),
    active: Joi.boolean(),
    created_by: Joi.number().min(1)
}

export const categoryChanged = Joi.object(category);

export const categoryCreated = Joi.object(category).fork(Object.keys(category), (schema) => schema.required())