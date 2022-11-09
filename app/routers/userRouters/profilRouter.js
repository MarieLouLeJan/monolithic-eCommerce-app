import express from 'express';
const profilRouter = express.Router();

import profilController from '../../controllers/userControllers/profilController.js';

import CW from '../../helpers/controllerWrapper.js';

import param from '../../helpers/paramsIsNumber.js';
import authObligatory from '../../services/authObligatory.js';


profilRouter.get('/', CW(profilController.index));

profilRouter.get('/orders', CW(profilController.ordersHistory));

profilRouter.get('/orders/details/:order', param, authObligatory, CW(profilController.orderHistoryDetails));

profilRouter.get('/adresses', CW(profilController.showAdressPage));

profilRouter.route('/addAdress')
        .get(CW(profilController.addAdressPage))
        .post(CW(profilController.addAdressAction));

profilRouter.get('/unactiveAdress/:adress', param, authObligatory, CW(profilController.unactiveAdressAction));

export default profilRouter;