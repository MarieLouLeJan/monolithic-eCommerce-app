const express = require('express');
const profilRouter = express.Router();

const profilController = require('../../controllers/userControllers/profilController');

const authObligatory = require('../../helpers/authObligatory');
const CW = require('../../helpers/controllerWrapper');


profilRouter.get('/dashboard/profil/adresses', CW(profilController.showAdressPage));
profilRouter.route('dashboard/profil/addAdress')
        .get(CW(profilController.addAdressPage))
        .post(CW(profilController.addAdressAction));
profilRouter.post('dashboard/profil/deleteAdress', CW(profilController.deleteAdressAction));

profilRouter.get('/dashboard/profil', authObligatory, CW(profilController.index));
profilRouter.route('/dashboard/profil/update')
        .get(authObligatory, CW(profilController.updateProfilPage))
        .post(authObligatory, CW(profilController.updateProfilAction));
profilRouter.get('/dashboard/profil/ordersHistory', authObligatory, CW(profilController.ordersHistory));
profilRouter.get('/dashboard/profil/ordersHistory/details/:orderId', authObligatory, CW(profilController.orderHistoryDetails));

module.exports = profilRouter;