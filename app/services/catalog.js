import pricesCalculation from './pricesCalculation.js';
import productQuery from '../queries/productQuery.js';
import categoryQuery from '../queries/categoryQuery.js';
import TVAQuery from '../queries/TVAQuery.js';


import ForbiddenError from '../helpers/ForbiddenError.js'

export default async (req, res, next) => {

    const categories = await categoryQuery.getAllCategories();
    res.locals.categories = categories.map(cat => cat.get( { plain: true } ));

    const products = await productQuery.getAllProducts();
    res.locals.products = products.map(prod => prod.get( { plain: true } ));

    for(const product of res.locals.products){
        product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
        product.priceHT = product.priceHT.toFixed(2)
    };

    const TVA = await TVAQuery.getAllTVA();
    res.locals.TVA = TVA.map(myTVA => myTVA.get( { plain: true } ));

    if(Object.keys(req.params).length > 0) {
        const key = Object.keys(req.params)[0];
        const query = `${key}Query`;
        const myQuery = eval(`async () => 
                                {res.locals.${key} = await ${query}.getById(${req.params.id}); 
                                if(res.locals.${key} === null) next(new ForbiddenError("Ce ${key} n'existe pas / plus"))}`);
        await myQuery();
    };

    if(res.locals.product) res.locals.product.priceTTC = pricesCalculation.getProductTTC(res.locals.product.priceHT, res.locals.product.tva.value)

    if(res.locals.category){
        for(const product of res.locals.category.products){
            product.priceTTC = pricesCalculation.getProductTTC(product.priceHT, product.tva.value);
            product.priceHT = product.priceHT.toFixed(2)
        };
    }

    return next()
};