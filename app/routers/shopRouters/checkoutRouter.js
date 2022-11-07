const express = require('express');
const checkoutRouter = express.Router();

const checkoutController = require('../../controllers/shopControllers/checkoutController');

const auth = require('../../helpers/auth');
const authObligatory = require('../../helpers/authObligatory');
const cartObligatory = require('../../helpers/cartObligatory');
const CW = require('../../helpers/controllerWrapper');

checkoutRouter.get('/checkout', cartObligatory, auth, CW(checkoutController.checkoutPage));

checkoutRouter.get('/checkout/shipping', cartObligatory, authObligatory, CW(checkoutController.getShippingAdressPage));
checkoutRouter.post('/checkout/shipping', cartObligatory, authObligatory, CW(checkoutController.getShippingAdressPage))

checkoutRouter.post('/checkout/complete', cartObligatory, authObligatory, CW(checkoutController.checkoutAction));


module.exports = checkoutRouter;
