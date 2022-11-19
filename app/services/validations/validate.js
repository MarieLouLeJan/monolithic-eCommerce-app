/**
 * Validation middleware factory
 * @param {object} schema - Schema Joi
 * @param {string} dataSource - Middleware request property name that contains data to validate
 * @returns {object} Middleware function
 */
 const validateFactory = (schema, dataSource) => async (req, res, next) => {
    try {
        await schema.validateAsync(req[dataSource]);
        return next();
    } catch (err) {
        return next(err);
    }
};
export default validateFactory;