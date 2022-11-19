import express from 'express';
const profilRouter = express.Router();

import profilController from '../../controllers/userControllers/profilController.js';

import CW from '../../helpers/controllerWrapper.js';
import param from '../../helpers/paramsIsNumber.js';

import authObligatory from '../../services/authObligatory.js';
import validate from '../../services/validations/validate.js';
import { adressChanged, adressCreated } from '../../services/validations/schemas/adress.js'
import bodyMaker from '../../services/deleteEmptyBody.js'



profilRouter.get('/', CW(profilController.index));

profilRouter.get('/orders', CW(profilController.ordersHistory));

profilRouter.get('/orders/details/:order', param, authObligatory, CW(profilController.orderHistoryDetails));

profilRouter.get('/adresses', CW(profilController.showAdressPage));

profilRouter.route('/addAdress')
        .get(CW(profilController.addAdressPage))
        .post(bodyMaker, validate(adressCreated, 'body'), CW(profilController.addAdressAction));

profilRouter.post('/unactiveAdress/:adress', param, authObligatory, validate(adressChanged, 'body'), CW(profilController.unactiveAdressAction));

profilRouter.post('/unactiveAccount', CW(profilController.unactiveAccountAction))

export default profilRouter;