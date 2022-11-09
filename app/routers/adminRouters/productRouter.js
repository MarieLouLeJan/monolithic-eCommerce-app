import express from 'express';
const productRouter = express.Router();

import productController from '../../controllers/adminControllers/productController.js';

import CW from '../../helpers/controllerWrapper.js';

import param from '../../helpers/paramsIsNumber.js';
import catalog from '../../services/catalog.js'

productRouter.get('/dashboard/admin/products', CW(productController.showAllProducts));

productRouter.route('/dashboard/admin/products/add')
        .get(productController.addProductPage)
        .post(productController.addProductAction);

productRouter.get('/dashboard/admin/products/details/:product', param, catalog, CW(productController.showProductDetails));

productRouter.route('/dashboard/admin/products/details/:id/update')
        .get(param, catalog, CW(productController.updateProductPage))
        .post(param, catalog, CW(productController.updateProductAction));

productRouter.get('/dashboard/admin/products/details/:product/delete', CW(productController.unactiveProduct));

export default productRouter;
