const bcrypt = require('bcrypt');
const usersQuery = require("../../queries/usersQuery");
const ordersQuery = require("../../queries/ordersQuery");
const adressQuery = require("../../queries/adressQuery");
const { dateFormat } = require('../../services/dateFormat');


export default {

    async index (req, res) {
        res.render('dashboard/profil/profil' )
    },

    // async updateProfilPage (_, res) {
    //     res.render('dashboard/profil/updateProfil')
    // },

    async showAdressPage (req, res) {
        const adresses = await adressQuery.getAllAdressesByUser(req.session.user.id)
        res.render('dashboard/profil/adress', { adresses })
    },

    async unactiveAdressAction (req, res) {
        const adressId = parseInt(req.params.id);
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
        const userOrders = await ordersQuery.getAllOrdersByUser(res.locals.user.id);
        for(const order of userOrders){
            order.date = dateFormat(order.created_at, 'MM-dd-yyyy')
        };
        res.render('dashboard/profil/ordersHistory', { orders: userOrders })
    },


    async orderHistoryDetails (req, res, next) {
        const orderId = parseInt(req.params.orderId);
        if(!isNaN(orderId)){
            const order = await ordersQuery.getOrderById(orderId);
            order.date = dateFormat(order.created_at, 'MM-dd-yyyy');
            const adresses = await ordersQuery.getOrderTypeAdress(orderId);
            const shipping = (adresses.find(adress => adress.adress_type.title === 'shipping')).get({ plain: true }).adresses;
            const billing = (adresses.find(adress => adress.adress_type.title === 'billing')).get({ plain: true }).adresses;
            const myProducts = await ordersQuery.getProductsByOrder(orderId);
            const products = myProducts.map(product => product.get({ plain: true }));
            console.log('shipping', shipping)
            res.render('dashboard/profil/orderHistoryDetails', { order, billing, shipping, products });
        } else if (isNaN(orderId)){
            next()
        }
    }
};
