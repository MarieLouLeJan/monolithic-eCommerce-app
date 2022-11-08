import pricesCalculation from './pricesCalculation.js';
import productsQuery from '../queries/productsQuery.js';
import categoriesQuery from '../queries/categoriesQuery.js';
import NotFoundError from '../helpers/notFoundError.js';

export default async (req, res, next) => {
    res.locals.products = await productsQuery.getAllProducts();
    res.locals.categories = await categoriesQuery.getAllCategories();
    for(const product of res.locals.products){
        product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
        product.priceHT = product.priceHT.toFixed(2)
    };

    if(req.params.categoryId){
        const categoryId = parseInt(req.params.categoryId);
        if(isNaN(categoryId)) next(new NotFoundError(`Veuillez rentrer un id de type number !`));
        res.locals.category = await categoriesQuery.getCategoryById(categoryId)
        for(const product of res.locals.category.products){
            product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
            product.priceHT = product.priceHT.toFixed(2)
        };
    }

    if(req.params.productId){
        const productId = parseInt(req.params.productId);
        if(isNaN(productId)) { next(new NotFoundError(`Veuillez rentrer un id de type number !`))};
        const product = await productsQuery.getProductById(productId)
        product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value)
        res.locals.product = product;

    }
    return next()
};