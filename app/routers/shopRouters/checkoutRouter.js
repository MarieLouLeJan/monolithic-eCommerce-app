import express from 'express';
const checkoutRouter = express.Router();

import controller from '../../controllers/shopControllers/checkoutController.js';

import CW from '../../helpers/controllerWrapper.js';

import cart from '../../services/cart.js';

checkoutRouter.get('/', CW(controller.checkoutPage));

checkoutRouter.post('/complete', CW(controller.checkoutAction));

export default checkoutRouter;
