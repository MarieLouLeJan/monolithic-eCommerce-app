const bcrypt = require('bcrypt');
const usersQuery = require("../../queries/usersQuery");
const ordersQuery = require("../../queries/ordersQuery");
const adressQuery = require("../../queries/adressQuery");


const profilController = {

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
        // Ici on ne supprime pas les adresses de la BDD, on swith le active à false
        // Car les adresses ont potentiellement pu etre utilisées pour des orders
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

    // !! OK JUSQU'ICI

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

module.exports = profilController;
