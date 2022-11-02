const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');
const profilController = require('../controllers/profilController');

const authObligatory = require('../validation/authObligatory');
const CW = require('../helpers/controllerWrapper');

userRouter.route('/login')
        .get(CW(userController.loginPage))
        .post(CW(userController.loginAction));
userRouter.get('/logout', CW(userController.logout));

userRouter.route('/register')
        .get(CW(userController.signupPage))
        .post(CW(userController.signupAction));

userRouter.get('/dashboard/profil', authObligatory, CW(profilController.index));
userRouter.route('/dashboard/profil/update')
        .get(authObligatory, CW(profilController.updateProfilPage))
        .post(authObligatory, CW(profilController.updateProfilAction));
userRouter.get('/dashboard/profil/ordersHistory', authObligatory, CW(profilController.ordersHistory));
userRouter.get('/dashboard/profil/ordersHistory/details/:orderId', authObligatory, CW(profilController.orderHistoryDetails));

module.exports = userRouter;