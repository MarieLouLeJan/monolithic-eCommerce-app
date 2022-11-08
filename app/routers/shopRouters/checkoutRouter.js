const express = require('express');
const checkoutRouter = express.Router();

const checkoutController = require('../../controllers/shopControllers/checkoutController');

const auth = require('../../services/auth');
const authObligatory = require('../../services/authObligatory');
const cartObligatory = require('../../services/cartObligatory');

const CW = require('../../helpers/controllerWrapper');

checkoutRouter.get('/checkout', cartObligatory, auth, CW(checkoutController.checkoutPage));

checkoutRouter.get('/checkout/shipping', cartObligatory, authObligatory, CW(checkoutController.getShippingAdressPage));
checkoutRouter.post('/checkout/shipping', cartObligatory, authObligatory, CW(checkoutController.getShippingAdressPage))

checkoutRouter.post('/checkout/complete', cartObligatory, authObligatory, CW(checkoutController.checkoutAction));


module.exports = checkoutRouter;
