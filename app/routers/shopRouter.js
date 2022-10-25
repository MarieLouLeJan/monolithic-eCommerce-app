const express = require('express');
const shopRouter = express.Router();

const catalogController = require('../controllers/catalogController');
const cartController = require('../controllers/cartController');
const checkoutController = require('../controllers/checkoutController');

const auth = require('../middlewares/auth');
const authObligatory = require('../middlewares/authObligatory');
const cart = require('../middlewares/cart');

shopRouter.get('/', auth, catalogController.index);
shopRouter.get('/shop', auth, catalogController.productsList);
shopRouter.get('/shop/category/:id', auth, catalogController.productsByCategory);
shopRouter.get('/shop/product/:id', auth, catalogController.productDetails);

shopRouter.get('/cart', auth, cartController.index);
shopRouter.post('/cart/:productId', auth, cartController.addOrUpdate);
shopRouter.post('/cart/erase/:productId', cart, auth, cartController.removeAllProducts);
shopRouter.post('/cart/remove/:productId', cart, auth, cartController.removeOneProduct);
shopRouter.get('/cart/destroy', cart, auth, cartController.destroyCart);

shopRouter.get('/checkout', cart, auth, checkoutController.checkoutPage);
shopRouter.get('/checkout/complete', authObligatory, cart, checkoutController.checkoutAction);

module.exports = shopRouter;