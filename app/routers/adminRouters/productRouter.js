import express from 'express';
const productRouter = express.Router();

import productController from '../../controllers/adminControllers/productController.js';

import CW from '../../helpers/controllerWrapper.js';

import param from '../../helpers/paramsIsNumber.js';

import catalogAdmin from '../../services/catalogAdmin.js';
import validate from '../../services/validations/validate.js';
import { productChanged, productCreated } from '../../services/validations/schemas/product.js';
import bodyMaker from '../../services/deleteEmptyBody.js'

productRouter.get('/products', CW(productController.showAllProducts));

productRouter.route('/products/addProduct')
        .get(productController.addProductPage)
        .post(validate(productCreated, 'body'), productController.addProductAction);

productRouter.get('/products/details/:product', param, CW(productController.showProductDetails));

productRouter.route('/products/details/:product/update')
        .get(param, catalogAdmin, CW(productController.updateProductPage))
        .post(param, catalogAdmin, bodyMaker, validate(productChanged, 'body'), CW(productController.updateProductAction));

productRouter.post('/products/details/unactive/:product', param, CW(productController.unactiveProduct));
productRouter.post('/products/details/active/:product', param, CW(productController.activeProduct));


export default productRouter;
