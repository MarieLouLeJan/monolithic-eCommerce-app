import express from 'express';
const cartRouter = express.Router();

import cartController from '../../controllers/shopControllers/cartController.js';

import cartObligatory from '../../services/cartObligatory.js';
import cart from '../../services/cart.js';
import param from '../../helpers/paramsIsNumber.js';
import catalog from '../../services/catalog.js'


import CW from '../../helpers/controllerWrapper.js';

cartRouter.get('/', cart, CW(cartController.index));

cartRouter.post('/:product', param, catalog, cart, CW(cartController.addOrUpdate));

cartRouter.post('/erase/:product', param, cartObligatory, CW(cartController.removeAllProducts));

cartRouter.post('/remove/:product', param, catalog, cartObligatory, CW(cartController.removeOneProduct));

cartRouter.get('/destroy', cartObligatory, CW(cartController.destroyCart));


export default cartRouter;