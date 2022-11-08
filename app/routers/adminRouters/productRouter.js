import express from 'express';
const productRouter = express.Router();

import productController from '../../controllers/adminControllers/productController.js';

import authObligatory from '../../services/authObligatory.js';
import isAdmin from '../../services/isAdmin.js';

import CW from '../../helpers/controllerWrapper.js';

productRouter.get('/dashboard/admin/products', authObligatory, isAdmin, CW(productController.showAllProducts));

productRouter.route('/dashboard/admin/products/add')
        .get(authObligatory, isAdmin, productController.addProductPage)
        .post(authObligatory, isAdmin, productController.addProductAction);

productRouter.get('/dashboard/admin/products/details/:productId', authObligatory, isAdmin, CW(productController.showProductDetails));

productRouter.route('/dashboard/admin/products/details/:productId/update')
        .get(authObligatory, isAdmin, CW(productController.updateProductPage))
        .post(authObligatory, isAdmin, CW(productController.updateProductAction));

productRouter.get('/dashboard/admin/products/details/:productId/delete', authObligatory, isAdmin, CW(productController.unactiveProduct));

export default productRouter;
