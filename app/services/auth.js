import adressQuery from '../queries/adressQuery.js';
import orderQuery from '../queries/orderQuery.js';

export default async (req, res, next) => {

    req.session.user = {
        id: 2,
        firstname: 'Maurice',
        lastname: 'Admin',
        email: 'admin@admin.com',
        active: true,
        role_id: 2,
        roles: { id: 2, title: 'admin'}
      }

    if (req.session.user) {
        res.locals.user = req.session.user;
        res.locals.user.adresses = await adressQuery.getAllAdressesByUser(res.locals.user.id);
        res.locals.user.orders = await orderQuery.getAllOrdersByUser(res.locals.user.id);
        return next();
    }

    if(Object.keys(req.params).length > 0) {
        const key = Object.keys(req.params)[0]
        const query = `${key}Query`;
        const myQuery = eval(`async () => {res.locals.${key} = await ${query}.getById(${req.params.id})}`)
        await myQuery()
    };

    return next()
};

