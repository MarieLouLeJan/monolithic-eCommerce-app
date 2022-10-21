const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');
const profilController = require('../controllers/profilController');

const auth = require('../middlewares/auth');

userRouter.get('/login', userController.loginPage);
userRouter.post('/login', userController.loginAction);
userRouter.get('/logout', userController.logout);

userRouter.get('/register', userController.signupPage);
userRouter.post('/register', userController.signupAction);

userRouter.get('/dashboard/profil', auth, profilController.index);
userRouter.get('/dashboard/profil/update', auth, profilController.updateProfilPage);
userRouter.post('/dashboard/profil/update', auth, profilController.updateProfilAction);
userRouter.get('/dashboard/profil/ordersHistory', auth, profilController.ordersHistory);
userRouter.get('/dashboard/profil/ordersHistory/details/:orderId', auth, profilController.orderHistoryDetails);

module.exports = userRouter;