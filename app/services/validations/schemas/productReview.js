import Joi from 'joi';

const frenchPattern = /^[a-zA-Z0-9Ã-ÿ '"°-]+$/;

export default Joi.object({
    product_id: Joi.number().min(1).required(),
    user_id: Joi.number().min(1).required(),
    note: Joi.number().min(1).required(),
    content: Joi.string().pattern(frenchPattern).min(20).required(),
}).min(5)
