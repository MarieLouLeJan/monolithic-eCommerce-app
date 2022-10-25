const auth = (req, res, next) => {

    if (req.session.user) {
        res.locals.user = req.session.user
        return next();
    }
    next()
};

module.exports = auth;