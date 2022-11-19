import Joi from 'joi';

const frenchPattern = /^[a-zA-Z0-9Ã-ÿ '"°-]+$/;

export default Joi.object({
    title: Joi.string().pattern(frenchPattern).min(2).required(),
}).min(1)