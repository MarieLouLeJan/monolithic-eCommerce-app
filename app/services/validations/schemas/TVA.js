import Joi from 'joi';

const titlePattern = /^([1-9]|[1-9][0-9])%$/;
const valuePattern = /^0\.[0-9]{2}$/;

export default Joi.object({
    title: Joi.string().pattern(titlePattern).min(2).required(),
    value: Joi.string().pattern(valuePattern).min(2).required(),
    active: Joi.boolean().required(),
    created_by: Joi.number().min(1).required()
});