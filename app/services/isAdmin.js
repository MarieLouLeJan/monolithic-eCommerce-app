export default (req, _, next) => {
    
    if (req.session.user.roles.title === 'admin') {
        return next();
    }

    req.status = 401;
    
    return next(new Error('Unauthorized'));
};