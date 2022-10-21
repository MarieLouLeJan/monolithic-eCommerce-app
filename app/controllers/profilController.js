const { User, Role, Order, Product, Order_has_product, Tva } = require("../models");
const bcrypt = require('bcrypt');


const profilController = {

    async index (req, res) {
        if(req.session.user){
            res.render('dashboard/profil/profil', { user : req.session.user })
        } 
    },

    updateProfilPage: async (req, res) => {
        res.render('dashboard/profil/updateProfil', { user : req.session.user })
    },

    async updateProfilAction (req, res) {
        try {
            const userToUpdate = await User.findOne({
                where: {
                    email: req.session.user.email,
                },
            });
            let result = await bcrypt.compare(req.body.checkPassword, userToUpdate.password);
            if(!result){
                const error = "Mot de passe incorrect";
                res.render('dashboard/complete', { error, user: req.session.user })
            }
            for (const prop in req.body) {
                if (!req.body[prop] || req.body.length === 0) {
                    delete req.body[prop]; 
                }
            }
            if(req.body.modifPassword){
                if(req.body.modifPassword === req.body.confirmPassword) {
                    req.body.password = await bcrypt.hash(req.body.modifPassword, 10);
                } else {
                    const error = "Les deux mots de passe ne correspondent pas"
                    res.render('dashboard/complete', { error, user: req.session.user });
                }
            }
            delete req.body.checkPassword
            delete req.body.confirmPassword;
            delete req.body.modifPassword;
            await userToUpdate.update(req.body)
            req.session.user = userToUpdate
            res.render('dashboard/dashboard', { user: req.session.user })
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async ordersHistory (req, res) {
        try {
            const userOrders = await Order.findAll({
                where: { user_id: req.session.user.id},
                raw: true,
            })
            res.render('dashboard/profil/ordersHistory', { orders: userOrders, user: req.session.user })
        } catch (error) {
            console.log(error);
            res.locals.error = {
              code: 500,
              text: "Query error"
            }
        }
    },

    async orderHistoryDetails (req, res, next) {
        const orderId = req.params.orderId;
        if(!isNaN(orderId)){
            try {
                const order = await Order.findAll( {
                    where: { id: orderId},
                    include: [
                        { model: Product, thought: Order_has_product, as: 'products'}   
                    ],
                    raw: true,
                    nest: true
                });
                res.render('dashboard/profil/orderHistoryDetails', { order, user: req.session.user })
            } catch (error) {
                console.log(error);
                res.locals.error = {
                  code: 500,
                  text: "Query error"
                }
            }
        } else if (isNaN(orderId)){
            next()
        }
    }
};

module.exports = profilController;
