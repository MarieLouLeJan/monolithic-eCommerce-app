import NotFoundError from './NotFoundError.js';

export default (req, _, next) => {

    Object.keys(req.params).forEach(key => {
        req.params[key] = parseInt(Object.values(req.params[key]))
        if(isNaN(Object.values(req.params[key]))) next(new NotFoundError(`Veuillez entrer un paramètre de type number`));
    })

    next()
}