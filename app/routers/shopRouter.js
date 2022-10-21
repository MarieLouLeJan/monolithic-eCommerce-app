const express = require('express');
const shopRouter = express.Router();

const catalogController = require('../controllers/catalogController');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');

const auth = require('../middlewares/auth');
const cart = require('../middlewares/cart')

shopRouter.get('/', catalogController.index);
shopRouter.get('/shop', catalogController.productsList);
shopRouter.get('/shop/category/:id', catalogController.productsByCategory);
shopRouter.get('/shop/product/:id', catalogController.productDetails);

shopRouter.get('/cart', cartController.index);
shopRouter.post('/cart/:productId', cartController.addOrUpdate);
shopRouter.post('/cart/erase/:productId', cart, cartController.removeAllProducts);
shopRouter.post('/cart/remove/:productId', cart, cartController.removeOneProduct);
shopRouter.get('/cart/destroy', cart, cartController.destroyCart);

shopRouter.get('/checkout', auth, cart, checkoutController.checkoutPage);
shopRouter.get('/checkout/complete', auth, cart, checkoutController.checkoutAction);

module.exports = shopRouter;