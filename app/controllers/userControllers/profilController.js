import ordersQuery from '../../queries/ordersQuery.js';
import adressQuery from '../../queries/adressQuery.js';


export default {

    async index (req, res) {
        res.render('dashboard/profil/profil' )
    },

    async updateProfilPage (_, res) {
        res.render('dashboard/profil/updateProfil')
    },

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
        const userOrders = await ordersQuery.getAllOrders();
        res.render('dashboard/profil/ordersHistory', { orders: userOrders })
    },

    async orderHistoryDetails (req, res, next) {
        const orderId = req.params.orderId;
        if(!isNaN(orderId)){
            const order = await ordersQuery.getOrderById(orderId)
            res.render('dashboard/profil/orderHistoryDetails', { order })
        } else if (isNaN(orderId)){
            next()
        }
    }
};
