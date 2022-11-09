import express from 'express';
const checkoutRouter = express.Router();

import checkoutController from '../../controllers/shopControllers/checkoutController.js';

import CW from '../../helpers/controllerWrapper.js';

checkoutRouter.get('/', CW(checkoutController.checkoutPage));

checkoutRouter.post('/complete', CW(checkoutController.checkoutAction));

export default checkoutRouter;
