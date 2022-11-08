import express from 'express';
const catalogRouter = express.Router();

import catalogController from '../../controllers/shopControllers/catalogController.js';

import catalog from '../../services/catalog.js'
import auth from '../../services/auth.js';

import CW from '../../helpers/controllerWrapper.js';

catalogRouter.get('/', auth, catalog, CW(catalogController.index));
catalogRouter.get('/shop', auth, catalog, CW(catalogController.productsList));
catalogRouter.get('/shop/category/:categoryId', auth, catalog, CW(catalogController.productsByCategory));
catalogRouter.get('/shop/product/:productId', auth, catalog, CW(catalogController.productDetails));


export default catalogRouter;