export default (req, res, next) => {
    
    if (req.session.user.role.name === 'admin') {
        return next();
    }

    req.status = 401;
    return next(new Error('Unauthorized'));
};