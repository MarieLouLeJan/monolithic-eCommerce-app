import express from 'express';
const productRouter = express.Router();

import productController from '../../controllers/adminControllers/productController.js';

import CW from '../../helpers/controllerWrapper.js';

import param from '../../helpers/paramsIsNumber.js';
import catalogAdmin from '../../services/catalogAdmin.js';

productRouter.get('/products', CW(productController.showAllProducts));

productRouter.route('/products/add')
        .get(productController.addProductPage)
        .post(productController.addProductAction);

productRouter.get('/products/details/:product', param, catalogAdmin, CW(productController.showProductDetails));

productRouter.route('/products/details/:product/update')
        .get(param, catalogAdmin, CW(productController.updateProductPage))
        .post(param, catalogAdmin, CW(productController.updateProductAction));

productRouter.get('/products/details/:product/unactive', param, catalogAdmin, CW(productController.unactiveProduct));
productRouter.get('/products/details/:product/active', param, catalogAdmin, CW(productController.activeProduct));


export default productRouter;
