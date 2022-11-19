import pricesCalculation from './pricesCalculation.js';
import productQuery from '../queries/productQuery.js';
import categoryQuery from '../queries/categoryQuery.js';
import TVAQuery from '../queries/TVAQuery.js';
import ForbiddenError from '../helpers/ForbiddenError.js';


export default async (req, res, next) => {

    // CATEGORIES

    res.locals.categories = await categoryQuery.getAllActiveCategories();

    res.locals.unactiveCategories = await categoryQuery.getAllUnactiveCategories();

    const allCategories = await categoryQuery.getAllCategories();
    res.locals.allCategories = allCategories.map(cat => cat.get({ plaon: true }))

    // PRODUCTS

    const products = await productQuery.getAllActiveProducts();
    res.locals.products = products.map(prod => prod.get( { plain: true } ));

    const unactiveProducts = await productQuery.getAllActiveProducts();
    res.locals.unactiveProducts = unactiveProducts.map(prod => prod.get( { plain: true } ));

    for(const product of res.locals.products){
        product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
        product.priceHT = product.priceHT.toFixed(2)
    };

    for(const product of res.locals.unactiveProducts){
        product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
        product.priceHT = product.priceHT.toFixed(2)
    };


    // TVA

    const TVA = await TVAQuery.getAllTVA();
    res.locals.tva = TVA.map(myTVA => myTVA.get( { plain: true } ));

    return next()
};