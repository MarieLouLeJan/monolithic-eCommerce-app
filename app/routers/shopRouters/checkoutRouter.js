import express from 'express';
const checkoutRouter = express.Router();

import checkoutController from '../../controllers/shopControllers/checkoutController.js';

import auth from '../../services/auth.js';
import authObligatory from '../../services/authObligatory.js';
import cartObligatory from '../../services/cartObligatory.js';

import CW from '../../helpers/controllerWrapper.js';

checkoutRouter.get('/checkout', auth, cartObligatory, CW(checkoutController.checkoutPage));

checkoutRouter.post('/checkout/complete', authObligatory, cartObligatory, CW(checkoutController.checkoutAction));

export default checkoutRouter;
