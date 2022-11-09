import NotFoundError from './NotFoundError.js';

export default (req, res, next) => {

    if(Object.keys(req.params).length > 0) {
            let id = parseInt((Object.values(req.params))[0]);
            if(isNaN(parseInt(id))) next(new NotFoundError(`Veuillez entrer un paramètre de type number`));
            req.params.id = id;
    }
    next()
}