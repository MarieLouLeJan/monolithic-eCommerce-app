const cart = (req, res, next) => {

    if (req.session.cart) {
        return next();
    }

    req.status = 403;
    console.log(Error)
    return next(new Error('Forbidden'));
};

module.exports = cart;