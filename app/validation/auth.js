const auth = (req, res, next) => {

    if (req.session.user) {
        res.locals.user = req.session.user
        return next();
    }
    return next()
};

module.exports = auth;