import Joi from 'joi';

const pricePattern = /^\d+(?:\.\d{0,2})?$/;
const TVAPattern = /^([1-9]|[1-9][0-9])%$/;

export default {
    product_id: Joi.number().min(1).required(),
    order_id: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required(),
    priceHT: Joi.string().pattern(pricePattern).min(1).required(),
    TVA: Joi.string().pattern(TVAPattern).min(2).required(),
}.min(5)
