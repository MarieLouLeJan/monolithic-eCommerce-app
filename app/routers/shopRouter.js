const express = require('express');
const shopRouter = express.Router();

const catalogController = require('../controllers/catalogController');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');

const auth = require('../middlewares/auth');
const authObligatory = require('../middlewares/authObligatory');
const cart = require('../middlewares/cart');
const CW = require('../helpers/controllerWrapper');

shopRouter.get('/', auth, CW(catalogController.index));
shopRouter.get('/shop', auth, CW(catalogController.productsList));
shopRouter.get('/shop/category/:id', auth, CW(catalogController.productsByCategory));
shopRouter.get('/shop/product/:id', auth, CW(catalogController.productDetails));

shopRouter.get('/cart', auth, CW(cartController.index));
shopRouter.post('/cart/:productId', auth, CW(cartController.addOrUpdate));
shopRouter.post('/cart/erase/:productId', cart, auth, CW(cartController.removeAllProducts));
shopRouter.post('/cart/remove/:productId', cart, auth, CW(cartController.removeOneProduct));
shopRouter.get('/cart/destroy', cart, auth, CW(cartController.destroyCart));

shopRouter.get('/checkout', cart, auth, CW(checkoutController.checkoutPage));
shopRouter.get('/checkout/complete', authObligatory, cart, CW(checkoutController.checkoutAction));

module.exports = shopRouter;