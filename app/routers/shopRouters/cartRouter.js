const express = require('express');
const cartRouter = express.Router();

const cartController = require('../../controllers/shopControllers/cartController');

const auth = require('../../services/auth');
const cartObligatory = require('../../services/cartObligatory');
const cart = require('../../services/cart');

const CW = require('../../helpers/controllerWrapper');


cartRouter.get('/cart', auth, cart, CW(cartController.index));
cartRouter.post('/cart/:productId', auth, cart, CW(cartController.addOrUpdate));
cartRouter.post('/cart/erase/:productId', cartObligatory, auth, CW(cartController.removeAllProducts));
cartRouter.post('/cart/remove/:productId', cartObligatory, auth, CW(cartController.removeOneProduct));
cartRouter.get('/cart/destroy', cart, auth, CW(cartController.destroyCart));


module.exports = cartRouter;