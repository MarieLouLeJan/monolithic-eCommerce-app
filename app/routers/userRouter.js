const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');
const profilController = require('../controllers/profilController');

const authObligatory = require('../middlewares/authObligatory');

userRouter.route('/login')
        .get(userController.loginPage)
        .post('/login', userController.loginAction);
userRouter.get('/logout', userController.logout);

userRouter.route('/register')
        .get(userController.signupPage)
        .post(userController.signupAction);

userRouter.get('/dashboard/profil', authObligatory, profilController.index);
userRouter.route('/dashboard/profil/update')
        .get(authObligatory, profilController.updateProfilPage)
        .post(authObligatory, profilController.updateProfilAction);
userRouter.get('/dashboard/profil/ordersHistory', authObligatory, profilController.ordersHistory);
userRouter.get('/dashboard/profil/ordersHistory/details/:orderId', authObligatory, profilController.orderHistoryDetails);

module.exports = userRouter;