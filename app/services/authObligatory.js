import ForbiddenError from '../helpers/ForbiddenError.js';
import adressQuery from '../queries/adressQuery.js';
import orderQuery from '../queries/orderQuery.js';
import dateFormat from './dateFormat.js';


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

    if (!req.session.user) {
        next(new ForbiddenError(`Veuillez vous connecter pour accéder à cette page !`));
    }
    
    res.locals.user = req.session.user
    res.locals.user.adresses = await adressQuery.getAllAdressesByUser(res.locals.user.id);

    const orders = await orderQuery.getAllOrdersByUser(res.locals.user.id);
    for(const o of orders) o.date = dateFormat(o.created_at, 'MM-dd-yyyy');
    res.locals.user.orders = orders;

    if(Object.keys(req.params).length > 0) {
        const key = Object.keys(req.params)[0];
        const query = `${key}Query`;
        const myQuery = eval(`async () => {res.locals.user.${key} = await ${query}.getById(${req.params.id})}`);
        await myQuery();
    };

    return next();
};
