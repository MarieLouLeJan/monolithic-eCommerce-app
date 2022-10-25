const authObligatory = (req, res, next) => {

    if (req.session.user) {
        res.locals.user = req.session.user
        return next();
    }

    req.status = 403;
    console.log(Error)
    return next(new Error('Forbidden'));
};

module.exports = authObligatory;
