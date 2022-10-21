// On se sert des locals pour trimballer notre user a droit a gauche :)
const auth = (req, res, next) => {

    if (req.session.user) {
        return next();
    }

    req.status = 403;
    console.log(Error)
    return next(new Error('Forbidden'));
};

module.exports = auth;
