const express = require('express');
const adminRouter = express.Router();

const categoryController = require('../controllers/adminControllers/categoryController');
const productController = require('../controllers/adminControllers/productController');
const TVAController = require('../controllers/adminControllers/TVAController');

const authObligatory = require('../middlewares/authObligatory');
const isAdmin = require('../middlewares/isAdmin');

// categories
adminRouter.get('/dashboard/admin/categories', authObligatory, isAdmin, categoryController.showAllCategories);
adminRouter.post('/dashboard/admin/categories/addCategory', authObligatory, isAdmin, categoryController.addCategoriesAction);
adminRouter.route('/dashboard/admin/categories/updateCategories')
        .get(authObligatory, isAdmin, categoryController.updateCategoriesPage)
        .post(authObligatory, isAdmin, categoryController.updateCategoriesAction);
adminRouter.post('/dashboard/admin/categories/deleteCategory/:categoryId', authObligatory, isAdmin, categoryController.deleteCategory);

// produits
adminRouter.get('/dashboard/admin/products', authObligatory, isAdmin, productController.showAllProducts);
adminRouter.route('/dashboard/admin/products/addProduct')
        .get(authObligatory, isAdmin, productController.addProductPage)
        .post(authObligatory, isAdmin, productController.addProductAction);
adminRouter.get('/dashboard/admin/products/details/:productId', authObligatory, isAdmin, productController.showProductDetails);
adminRouter.get('/dashboard/admin/products/details/:productId/delete', authObligatory, isAdmin, productController.deleteProductAction);
adminRouter.route('/dashboard/admin/products/details/:productId/update')
        .get(authObligatory, isAdmin, productController.deleteProductAction)
        .post(authObligatory, isAdmin, productController.updateProductAction);

// tva
adminRouter.get('/dashboard/admin/TVA', authObligatory, isAdmin, TVAController.showAllTVA);
adminRouter.post('/dashboard/admin/TVA/addTVA', authObligatory, isAdmin, TVAController.addTVAAction);
adminRouter.route('/dashboard/admin/TVA/updateTVA')
        .get(authObligatory, isAdmin, TVAController.updateTVAPage)
        .post(authObligatory, isAdmin, TVAController.updateTVAAction);
adminRouter.post('/dashboard/admin/TVA/deleteTVA/:TVAId', authObligatory, isAdmin, TVAController.deleteTVA);

module.exports = adminRouter;
