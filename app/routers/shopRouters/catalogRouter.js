import express from 'express';
const catalogRouter = express.Router();

import controller from '../../controllers/shopControllers/catalogController.js';
import validate from '../../services/validations/validate.js';
import productReview from '../../services/validations/schemas/productReview.js'

import CW from '../../helpers/controllerWrapper.js';
import param from '../../helpers/paramsIsNumber.js';

catalogRouter.get('/', CW(controller.index));

catalogRouter.get('/shop/:page', param, CW(controller.productsList));

catalogRouter.get('/shop/search/search', controller.search);

catalogRouter.get('/shop/category/:category', param,  CW(controller.productsByCategory));

catalogRouter.get('/shop/product/:product', param, CW(controller.productDetails));

catalogRouter.get('/shop/product/:product/addReview', param, CW(controller.addReviewPage))
catalogRouter.post('/shop/product/:product/addReview', param, validate(productReview), CW(controller.addReviewAction))


export default catalogRouter;