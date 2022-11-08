const express = require('express');
const productRouter = express.Router();

const productController = require('../../controllers/adminControllers/productController');

const authObligatory = require('../../services/authObligatory');
const isAdmin = require('../../services/isAdmin');

const CW = require('../../helpers/controllerWrapper')

productRouter.get('/dashboard/admin/products', authObligatory, isAdmin, CW(productController.showAllProducts));

productRouter.route('/dashboard/admin/products/add')
        .get(authObligatory, isAdmin, productController.addProductPage)
        .post(authObligatory, isAdmin, productController.addProductAction);

productRouter.get('/dashboard/admin/products/details/:productId', authObligatory, isAdmin, CW(productController.showProductDetails));

productRouter.get('/dashboard/admin/products/details/:productId/delete', authObligatory, isAdmin, CW(productController.deleteProductAction));

productRouter.route('/dashboard/admin/products/details/:productId/update')
        .get(authObligatory, isAdmin, CW(productController.deleteProductAction))
        .post(authObligatory, isAdmin, CW(productController.updateProductAction));


module.exports = productRouter;
