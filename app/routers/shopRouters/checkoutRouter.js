const express = require('express');
const checkoutRouter = express.Router();

const checkoutController = require('../../controllers/shopControllers/checkoutController');

const auth = require('../../helpers/auth');
const authObligatory = require('../../helpers/authObligatory');
const cart = require('../../helpers/cart');
const CW = require('../../helpers/controllerWrapper');

checkoutRouter.get('/checkout', cart, auth, CW(checkoutController.checkoutPage));
checkoutRouter.get('/checkout/complete', cart, authObligatory, CW(checkoutController.checkoutAction));


module.exports = checkoutRouter;
