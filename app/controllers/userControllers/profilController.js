import ordersQuery from '../../queries/ordersQuery.js';
import adressQuery from '../../queries/adressQuery.js';


export default {

    async index (req, res) {
        res.render('dashboard/profil/profil' )
    },

    async showAdressPage (req, res) {
        res.render('dashboard/profil/adress')
    },

    async unactiveAdressAction (req, res) {
        const adressId = parseInt(req.params.id);
        if(isNaN(adressId))
        await adressQuery.unactiveAdress(adressId);
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
        const orderId = req.params.orderId;
        if(isNaN(orderId)) next()
        const order = await ordersQuery.getOrderById(orderId)
        res.render('dashboard/profil/orderHistoryDetails', { order })
    }
};
