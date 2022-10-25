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
adminRouter.get('/dashboard/admin/categories/updateCategories', authObligatory, isAdmin, categoryController.updateCategoriesPage);
adminRouter.post('/dashboard/admin/categories/updateCategories', authObligatory, isAdmin, categoryController.updateCategoriesAction);
adminRouter.post('/dashboard/admin/categories/deleteCategory/:categoryId', authObligatory, isAdmin, categoryController.deleteCategory);

// produits
adminRouter.get('/dashboard/admin/products', authObligatory, isAdmin, productController.showAllProducts);
adminRouter.get('/dashboard/admin/products/addProduct', authObligatory, isAdmin, productController.addProductPage);
adminRouter.post('/dashboard/admin/products/addProduct', authObligatory, isAdmin, productController.addProductAction);
adminRouter.get('/dashboard/admin/products/details/:productId', authObligatory, isAdmin, productController.showProductDetails);
adminRouter.get('/dashboard/admin/products/details/:productId/delete', authObligatory, isAdmin, productController.deleteProductAction);
adminRouter.get('/dashboard/admin/products/details/:productId/update', authObligatory, isAdmin, productController.updateProductPage);
adminRouter.post('/dashboard/admin/products/details/:productId/update', authObligatory, isAdmin, productController.updateProductAction);

// tva
adminRouter.get('/dashboard/admin/TVA', authObligatory, isAdmin, TVAController.showAllTVA);
adminRouter.post('/dashboard/admin/TVA/addTVA', authObligatory, isAdmin, TVAController.addTVAAction);
adminRouter.get('/dashboard/admin/TVA/updateTVA', authObligatory, isAdmin, TVAController.updateTVAPage);
adminRouter.post('/dashboard/admin/TVA/updateTVA', authObligatory, isAdmin, TVAController.updateTVAAction);
adminRouter.post('/dashboard/admin/TVA/deleteTVA/:categoryId', authObligatory, isAdmin, TVAController.deleteTVA);

module.exports = adminRouter;
