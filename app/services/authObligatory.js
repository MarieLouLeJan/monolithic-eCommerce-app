const ForbiddenError = require("../helpers/ForbiddenError");

const authObligatory = (req, res, next) => {
    
    req.session.user = {
        id: 3,
        firstname: 'Lilou',
        lastname: 'LeJan',
        email: 'lilou@gmail.com',
        role_id: 1,
        roles: { id: 1, title: 'customer'}
      }

    if (!req.session.user) {
        next(new ForbiddenError(`Veuillez vous connecter pour accéder à cette page !`));
    }
    res.locals.user = req.session.user
    return next();
};

module.exports = authObligatory;
