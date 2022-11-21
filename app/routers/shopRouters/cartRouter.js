import express from 'express';
const cartRouter = express.Router();

import controller from '../../controllers/shopControllers/cartController.js';

import cartObligatory from '../../services/cartObligatory.js';
import cart from '../../services/cart.js';

import param from '../../helpers/paramsIsNumber.js';
import CW from '../../helpers/controllerWrapper.js';

cartRouter.get('/', cart, CW(controller.index));

cartRouter.post('/:product', param, cart, CW(controller.addOrUpdate));

cartRouter.post('/erase/:product', param, cartObligatory, CW(controller.removeAllProducts));

cartRouter.post('/remove/:product', param, cartObligatory, CW(controller.removeOneProduct));

cartRouter.get('/destroy', cartObligatory, CW(controller.destroyCart));


export default cartRouter;