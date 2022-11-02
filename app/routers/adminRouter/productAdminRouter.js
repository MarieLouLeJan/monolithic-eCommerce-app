const express = require('express');
const productAdminRouter = express.Router();

const productController = require('../../controllers/adminControllers/productController');

const authObligatory = require('../../validation/authObligatory');
const isAdmin = require('../../validation/isAdmin');
const CW = require('../../helpers/controllerWrapper')


productAdminRouter.get('/dashboard/admin/products', authObligatory, isAdmin, CW(productController.showAllProducts));

productAdminRouter.route('/dashboard/admin/products/addProduct')
        .get(authObligatory, isAdmin, productController.addProductPage)
        .post(authObligatory, isAdmin, productController.addProductAction);

productAdminRouter.get('/dashboard/admin/products/details/:productId', authObligatory, isAdmin, CW(productController.showProductDetails));

productAdminRouter.get('/dashboard/admin/products/details/:productId/delete', authObligatory, isAdmin, CW(productController.deleteProductAction));

productAdminRouter.route('/dashboard/admin/products/details/:productId/update')
        .get(authObligatory, isAdmin, CW(productController.deleteProductAction))
        .post(authObligatory, isAdmin, CW(productController.updateProductAction));


module.exports = productAdminRouter;
