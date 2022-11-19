import pricesCalculation from './pricesCalculation.js';
import productQuery from '../queries/productQuery.js';
import categoryQuery from '../queries/categoryQuery.js';
import TVAQuery from '../queries/TVAQuery.js';
import ForbiddenError from '../helpers/ForbiddenError.js';

export default async (req, res, next) => {

    // GET ALL CATEGORIES
    const allCategories = await categoryQuery.getAllActiveNotEmptyCategories();
    const categories = [];
    for(const cat of allCategories) if(cat.products.length > 0) categories.push(cat)
    res.locals.categories = categories
    return next()
};