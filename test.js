

import Joi from 'joi';

const frenchPattern = /^[a-zA-Z0-9Ã-ÿ '"°-]+$/;
const postalCodePattern = /[0-9]{5}/;

const adress = ({
    untitled: Joi.string().pattern(frenchPattern).min(2),
    number: Joi.number().min(1),
    number_complement: Joi.string().pattern(frenchPattern),
    street: Joi.string().pattern(frenchPattern).min(2),
    postal_code: Joi.number().pattern(postalCodePattern).min(5).max(5),
    city: Joi.string().pattern(frenchPattern).min(2),
    country: Joi.string().pattern(frenchPattern).min(2),
    complement: Joi.string().pattern(frenchPattern),
    active: Joi.boolean(),
}).min(1)

const adressChanged = Joi.object(adress);

const fewReqJoiObj = Joi.object(schemaObj).fork(['email', 'password'], (schema) => schema.required());

const adressCreated = Joi.object(adress).fork(['untitled', 'number', 'street', 'postal_code', 'city', 'country', 'active'], (schema) => schema.required);

console.log(adressCreated)