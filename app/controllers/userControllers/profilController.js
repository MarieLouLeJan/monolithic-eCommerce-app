import adressQuery from '../../queries/adressQuery.js';
import orderQuery from '../../queries/orderQuery.js';
import userQuery from '../../queries/userQuery.js';
import dateFormat from '../../services/dateFormat.js'

export default {

    async index (req, res) {
        res.render('dashboard/profil/profil' )
    },

    async showAdressPage (req, res) {
        res.render('dashboard/profil/adress')
    },

    async unactiveAdressAction (req, res) {
        await adressQuery.unactiveAdress(req.params.adress);
        res.redirect('/dashboard/profil/adresses')
    },

    addAdressPage (req, res) {
        res.render('dashboard/profil/addAdress')
    },

    async addAdressAction (req, res) {
        await adressQuery.createAdress(req.body);
        res.redirect('/dashboard/profil/adresses');
    },

    async ordersHistory (req, res) {
        res.render('dashboard/profil/ordersHistory')
    },


    async orderHistoryDetails (req, res, next) {
        const order = res.locals.user.orders.find(order => order.id = req.params.order)
        order.date = dateFormat(order.created_at, 'MM-dd-yyyy');
        
        let products = await orderQuery.getAllProductsByOrder(order.id);
        order.products = products.map(product => product.get({ plain: true }))

        let adresses = await orderQuery.getAllAdressesByOrder(order.id);
        order.adresses = adresses.map(adress => adress.get({ plain: true }))
        console.log(order)


        res.render('dashboard/profil/orderHistoryDetails', { order })
    },

    async unactiveAccountAction (req, res, next) {
        userQuery.unactiveAccount(res.locals.user.id);
        delete req.session 
        res.redirect('/logout')
    }
};
