const express = require('express');
const cartRouter = express.Router();

const cartController = require('../../controllers/shopControllers/cartController');

const auth = require('../../helpers/auth');
const cart = require('../../helpers/cart');
const CW = require('../../helpers/controllerWrapper');

cartRouter.get('/cart', auth, CW(cartController.index));
cartRouter.post('/cart/:productId', auth, CW(cartController.addOrUpdate));
cartRouter.post('/cart/erase/:productId', cart, auth, CW(cartController.removeAllProducts));
cartRouter.post('/cart/remove/:productId', cart, auth, CW(cartController.removeOneProduct));
cartRouter.get('/cart/destroy', cart, auth, CW(cartController.destroyCart));


module.exports = cartRouter;