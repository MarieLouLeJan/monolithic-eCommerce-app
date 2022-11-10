import pricesCalculation from './pricesCalculation.js';
import ForbiddenError from '../helpers/ForbiddenError.js';


const cartObligatory = (req, res, next) => {

    if (!req.session.cart) next(new ForbiddenError(`Vous n'êtes pas autorisé(e) à accéder à cette page`));
    const { cartHT, cartTTC, cartTax } = pricesCalculation.getAllCartTotals(req.session.cart);
    req.session.cart.totalHT = cartHT;
    req.session.cart.totalTTC = cartTTC;
    req.session.cart.totalTax = cartTax;
    res.locals.cart = req.session.cart;

    let quantity = 0;

    for(const products of req.session.cart) quantity += products.qty;

    req.session.cart.quantity = quantity;

    res.locals.cart = req.session.cart;
    
    return next();
};

export default cartObligatory;