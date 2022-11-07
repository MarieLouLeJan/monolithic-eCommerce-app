const express = require('express');
const cartRouter = express.Router();

const cartController = require('../../controllers/shopControllers/cartController');

const auth = require('../../helpers/auth');
const cartObligatory = require('../../helpers/cartObligatory');
const CW = require('../../helpers/controllerWrapper');
const cart = require('../../helpers/cart');;

cartRouter.get('/cart', auth, cart, CW(cartController.index));
cartRouter.post('/cart/:productId', auth, cart, CW(cartController.addOrUpdate));
cartRouter.post('/cart/erase/:productId', cartObligatory, auth, CW(cartController.removeAllProducts));
cartRouter.post('/cart/remove/:productId', cartObligatory, auth, CW(cartController.removeOneProduct));
cartRouter.get('/cart/destroy', cart, auth, CW(cartController.destroyCart));


module.exports = cartRouter;