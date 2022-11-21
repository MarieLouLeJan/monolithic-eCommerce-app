import express from 'express';
const productRouter = express.Router();

import controller from '../../controllers/adminControllers/productController.js';

import CW from '../../helpers/controllerWrapper.js';
import param from '../../helpers/paramsIsNumber.js';

import catalogAdmin from '../../services/catalogAdmin.js';
import validate from '../../services/validations/validate.js';
import { productChanged, productCreated } from '../../services/validations/schemas/product.js';
import bodyMaker from '../../services/deleteEmptyBody.js'

productRouter.get('/', CW(controller.showAllProducts));

productRouter.route('/addProduct')
        .get(controller.addProductPage)
        .post(validate(productCreated, 'body'), controller.addProductAction);

productRouter.get('/details/:product', param, CW(controller.showProductDetails));

productRouter.route('/details/:product/update')
        .get(param, catalogAdmin, CW(controller.updateProductPage))
        .post(param, catalogAdmin, bodyMaker, validate(productChanged, 'body'), CW(controller.updateProductAction));

productRouter.post('/details/unactive/:product', param, CW(controller.unactiveProduct));
productRouter.post('/details/active/:product', param, CW(controller.activeProduct));


export default productRouter;
