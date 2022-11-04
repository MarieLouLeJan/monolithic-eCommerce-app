const express = require('express');
const catalogRouter = express.Router();

const catalogController = require('../../controllers/shopControllers/catalogController');

const auth = require('../../helpers/auth');
const CW = require('../../helpers/controllerWrapper');

catalogRouter.get('/', auth, CW(catalogController.index));
catalogRouter.get('/shop', auth, CW(catalogController.productsList));
catalogRouter.get('/shop/category/:id', auth, CW(catalogController.productsByCategory));
catalogRouter.get('/shop/product/:id', auth, CW(catalogController.productDetails));


module.exports = catalogRouter;