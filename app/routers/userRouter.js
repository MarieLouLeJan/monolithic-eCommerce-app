const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');
const profilController = require('../controllers/profilController');

const authObligatory = require('../middlewares/authObligatory');

userRouter.get('/login', userController.loginPage);
userRouter.post('/login', userController.loginAction);
userRouter.get('/logout', userController.logout);

userRouter.get('/register', userController.signupPage);
userRouter.post('/register', userController.signupAction);

userRouter.get('/dashboard/profil', authObligatory, profilController.index);
userRouter.get('/dashboard/profil/update', authObligatory, profilController.updateProfilPage);
userRouter.post('/dashboard/profil/update', authObligatory, profilController.updateProfilAction);
userRouter.get('/dashboard/profil/ordersHistory', authObligatory, profilController.ordersHistory);
userRouter.get('/dashboard/profil/ordersHistory/details/:orderId', authObligatory, profilController.orderHistoryDetails);

module.exports = userRouter;