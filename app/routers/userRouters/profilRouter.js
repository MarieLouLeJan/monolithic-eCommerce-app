const express = require('express');
const profilRouter = express.Router();

const profilController = require('../../controllers/userControllers/profilController');

const authObligatory = require('../../helpers/authObligatory');
const auth = require('../../helpers/auth');

const CW = require('../../helpers/controllerWrapper');


profilRouter.get('/dashboard/profil', authObligatory, CW(profilController.index));

profilRouter.route('/dashboard/profil/update')
        .get(authObligatory, CW(profilController.updateProfilPage))
        // .post(authObligatory, CW(profilController.updateProfilAction));
profilRouter.get('/dashboard/profil/ordersHistory', authObligatory, CW(profilController.ordersHistory));
profilRouter.get('/dashboard/profil/ordersHistory/details/:orderId', authObligatory, CW(profilController.orderHistoryDetails));

profilRouter.get('/dashboard/profil/adresses', authObligatory, CW(profilController.showAdressPage));
profilRouter.route('/dashboard/profil/addAdress')
        .get(authObligatory, CW(profilController.addAdressPage))
        .post(authObligatory, CW(profilController.addAdressAction));
profilRouter.get('/dashboard/profil/unactiveAdress/:id', CW(profilController.unactiveAdressAction));


module.exports = profilRouter;