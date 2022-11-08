import adressQuery from '../queries/adressQuery.js';
import ordersQuery from '../queries/ordersQuery.js';

export default async (req, res, next) => {

    if (req.session.user) {
        res.locals.user = req.session.user
        res.locals.user = req.session.user
        res.locals.user.adresses = await adressQuery.getAllAdressesByUser(res.locals.user.id);
        res.locals.user.orders = await ordersQuery.getAllOrdersByUser(res.locals.user.id);
        return next();
    }
    return next()
};
