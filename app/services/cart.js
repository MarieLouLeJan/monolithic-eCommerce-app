import pricesCalculation from './pricesCalculation.js';

export default (req, res, next) => {
    
    req.session.cart = req.session.cart || [];
    req.session.cart.forEach(prod => {
        const {totalHT, totalTTC} = pricesCalculation.getAllProductsTotal(prod.priceHT, prod.qty, prod.tva.value);
        prod.totalHT = totalHT;
        prod.totalTTC = totalTTC;
    });

    const { cartHT, cartTTC, cartTax } = pricesCalculation.getAllCartTotals(req.session.cart);

    req.session.cart.totalHT = cartHT;
    req.session.cart.totalTTC = cartTTC;
    req.session.cart.totalTax = cartTax;
    res.locals.cart = req.session.cart;
    
    return next()
};