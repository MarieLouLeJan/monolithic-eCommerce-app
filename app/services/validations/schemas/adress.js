import Joi from 'joi';

const frenchPattern = /^[a-zA-Z0-9Ã-ÿ '"°-]+$/;
const postalCodePattern = /[0-9]{5}/;

const adress = {
    entitled: Joi.string().pattern(frenchPattern).min(2),
    number: Joi.number().min(1),
    number_complement: Joi.string().pattern(frenchPattern),
    street: Joi.string().pattern(frenchPattern).min(2),
    postal_code: Joi.string().pattern(postalCodePattern),
    city: Joi.string().pattern(frenchPattern).min(2),
    country: Joi.string().pattern(frenchPattern).min(2),
    complement: Joi.string().pattern(frenchPattern),
    active: Joi.boolean(),
    user_id: Joi.number().min(1)
}

export const adressChanged = Joi.object(adress);

export const adressCreated = Joi.object(adress).fork(['entitled', 'number', 'street', 'postal_code', 'city', 'country', 'active'], (schema) => schema.required())