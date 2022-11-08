import express from 'express';
const profilRouter = express.Router();

import profilController from '../../controllers/userControllers/profilController.js';

import authObligatory from '../../services/authObligatory.js';

import CW from '../../helpers/controllerWrapper.js';

profilRouter.get('/dashboard/profil', authObligatory, CW(profilController.index));

profilRouter.route('/dashboard/profil/update')
        .get(authObligatory, CW(profilController.updateProfilPage))

profilRouter.get('/dashboard/profil/ordersHistory', authObligatory, CW(profilController.ordersHistory));
profilRouter.get('/dashboard/profil/ordersHistory/details/:orderId', authObligatory, CW(profilController.orderHistoryDetails));
profilRouter.get('/dashboard/profil/adresses', authObligatory, CW(profilController.showAdressPage));
profilRouter.route('/dashboard/profil/addAdress')
        .get(authObligatory, CW(profilController.addAdressPage))
        .post(authObligatory, CW(profilController.addAdressAction));
profilRouter.get('/dashboard/profil/unactiveAdress/:id', CW(profilController.unactiveAdressAction));

export default profilRouter;