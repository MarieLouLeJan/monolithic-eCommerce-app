import adressQuery from '../../queries/adressQuery.js';


export default async (req, res, next) => {

    if (req.session.user) {
        res.locals.user = req.session.user
        res.locals.user = await adressQuery.getAllAdressesByUser(req.session.user.id)

        return next();
    }
    return next()
};
