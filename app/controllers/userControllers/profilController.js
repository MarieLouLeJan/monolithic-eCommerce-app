import adressQuery from '../../queries/adressQuery.js';
import orderQuery from '../../queries/orderQuery.js';
import dateFormat from '../../services/dateFormat.js'

export default {

    async index (req, res) {
        res.render('dashboard/profil/profil' )
    },

    async showAdressPage (req, res) {
        res.render('dashboard/profil/adress')
    },

    async unactiveAdressAction (req, res) {
        await adressQuery.unactiveAdress(res.locals.adress);
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
        res.locals.user.order.date = dateFormat(res.locals.user.order.created_at, 'MM-dd-yyyy');

        let products = await orderQuery.getAllProductsByOrder(req.params.id);
        products = products.map(product => product.get({ plain: true }))

        let adresses = await orderQuery.getAllAdressesByOrder(req.params.id);
        adresses = adresses.map(adress => adress.get({ plain: true }))
        console.log(products)

        res.render('dashboard/profil/orderHistoryDetails', { products, adresses })
    }
};
