import express from 'express';
const cartRouter = express.Router();

import cartController from '../../controllers/shopControllers/cartController.js';

import auth from '../../services/auth.js';
import cartObligatory from '../../services/cartObligatory.js';
import cart from '../../services/cart.js';

import CW from '../../helpers/controllerWrapper.js';

cartRouter.get('/cart', auth, cart, CW(cartController.index));
cartRouter.post('/cart/:productId', auth, cart, CW(cartController.addOrUpdate));
cartRouter.post('/cart/erase/:productId', cartObligatory, auth, CW(cartController.removeAllProducts));
cartRouter.post('/cart/remove/:productId', cartObligatory, auth, CW(cartController.removeOneProduct));
cartRouter.get('/cart/destroy', cart, auth, CW(cartController.destroyCart));


export default cartRouter;