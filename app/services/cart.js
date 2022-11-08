const pricesCalculation = require('../services/pricesCalculation');

const cart = (req, res, next) => {
    
    req.session.cart = req.session.cart || [];
    const { cartHT, cartTTC, cartTax } = pricesCalculation.getAllCartTotals(req.session.cart);
    req.session.cart.totalHT = cartHT;
    req.session.cart.totalTTC = cartTTC;
    req.session.cart.totalTax = cartTax;
    res.locals.cart = req.session.cart;
    return next()
};

module.exports = cart;