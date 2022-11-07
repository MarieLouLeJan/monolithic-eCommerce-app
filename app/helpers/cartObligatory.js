const pricesCalculation = require('../services/pricesCalculation');
const ForbiddenError = require("./ForbiddenError");


const cartObligatory = (req, res, next) => {

    if (!req.session.cart) {
        next(new ForbiddenError(`Vous n'êtes pas autorisé(e) à accéder à cette page`));
    }
    const { cartHT, cartTTC, cartTax } = pricesCalculation.getAllCartTotals(req.session.cart);
    req.session.cart.totalHT = cartHT;
    req.session.cart.totalTTC = cartTTC;
    req.session.cart.totalTax = cartTax;
    res.locals.cart = req.session.cart;
    const quantity = 0;
    return next();
};

module.exports = cartObligatory;