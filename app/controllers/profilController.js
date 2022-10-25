const { User, Role, Order, Product, Order_has_product, Tva } = require("../models");
const bcrypt = require('bcrypt');
const validator = require('email-validator');

const profilController = {

    async index (req, res) {
        res.render('dashboard/profil/profil' )
    },

    updateProfilPage: async (req, res) => {
        res.render('dashboard/profil/updateProfil')
    },

    async updateProfilAction (req, res) {
        try {
            const userFound = await User.findOne({
                where: {
                    email: req.session.user.email,
                },
                include: 'role'
            });
            let passwordOk = await bcrypt.compare(req.body.checkPassword, userFound.password);
            if(!passwordOk) {
                delete req.body;
                const error = "Mot de passe incorrect"
                res.render('dashboard/profil/updateProfil', { error });
            }
            const emailOk = validator.validate(req.body.email);
            if(!emailOk) { 
                delete req.body
                const error = "Email non valide"; 
                res.render('dashboard/profil/updateProfil', { error })
            }
            if(req.body.modifPassword){
                if(req.body.modifPassword === req.body.confirmPassword) {
                    req.body.password = await bcrypt.hash(req.body.modifPassword, 10);
                } else {
                    delete req.body
                    const error = "Les deux mots de passe ne correspondent pas"
                    res.render('dashboard/profil/updateProfil', { error });
                }
            }
            const userToUpdate = userFound.get( {plain: true} )
            Object.keys(req.body).forEach(key => !req.body[key] && delete req.body[key]);
            const userUpdated = { ...userToUpdate, ...req.body}
            await userFound.update(userUpdated)
            req.session.user = userFound
            res.redirect('/dashboard/profil')
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
            res.render('dashboard/profil/ordersHistory', { orders: userOrders })
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
                res.render('dashboard/profil/orderHistoryDetails', { order })
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
