import Joi from 'joi';

const pricePattern = /(^\d+$)|(^\d+\.\d$)|(^\d+\.\d\d$)$/;

export default Joi.object({
    totalHT: Joi.string().pattern(pricePattern).min(2).required(),
    tax: Joi.string().pattern(pricePattern).min(2).required(),
    totalTTC: Joi.string().pattern(pricePattern).min(2).required(),
    quantity: Joi.number().min(1).required(),
    user_id: Joi.number().min(1).required(),
    order_states_id: Joi.number().min(1).required(),
}).min(1)