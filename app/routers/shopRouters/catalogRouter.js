import express from 'express';
const catalogRouter = express.Router();

import catalogController from '../../controllers/shopControllers/catalogController.js';

import CW from '../../helpers/controllerWrapper.js';

import param from '../../helpers/paramsIsNumber.js';
import catalog from '../../services/catalog.js'

catalogRouter.get('/', CW(catalogController.index));

catalogRouter.get('/shop', CW(catalogController.productsList));

catalogRouter.get('/shop/category/:category', param, catalog, CW(catalogController.productsByCategory));

catalogRouter.get('/shop/product/:product', param, catalog, CW(catalogController.productDetails));

export default catalogRouter;