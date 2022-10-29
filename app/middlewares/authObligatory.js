const authObligatory = (req, res, next) => {

    req.session.user = {
        id: 2,
        firstname: 'Maurice',
        lastname: 'Admin',
        email: 'admin@admin.com',
        role_id: 2,
        phone: null,
        shipping: null,
        billing: null,
        role: { id: 2, name: 'admin' }
      }
    if (req.session.user) {
        res.locals.user = req.session.user
        return next();
    }

    req.status = 403;
    console.log(Error)
    return next(new Error('Forbidden'));
};

module.exports = authObligatory;
