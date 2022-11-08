const auth = (req, res, next) => {
    
    req.session.user = {
        id: 3,
        firstname: 'lilou',
        lastname: 'lilou',
        email: 'lilou@gmail.com',
        role_id: 1,
        roles: { id: 1, title: 'customer'}
    }

    if (req.session.user) {
        res.locals.user = req.session.user
        return next();
    }
    return next()
};

module.exports = auth;