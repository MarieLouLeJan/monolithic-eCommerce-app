const express = require('express');
const adminRouter = express.Router();

const categoryController = require('../controllers/adminControllers/categoryController');
const productController = require('../controllers/adminControllers/productController');
const TVAController = require('../controllers/adminControllers/TVAController');

const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// categories
adminRouter.get('/dashboard/admin/categories', auth, isAdmin, categoryController.showAllCategories);
adminRouter.post('/dashboard/admin/categories/addCategory', auth, isAdmin, categoryController.addCategoriesAction);
adminRouter.get('/dashboard/admin/categories/updateCategories', auth, isAdmin, categoryController.updateCategoriesPage);
adminRouter.post('/dashboard/admin/categories/updateCategories', auth, isAdmin, categoryController.updateCategoriesAction);
adminRouter.post('/dashboard/admin/categories/deleteCategory/:categoryId', auth, isAdmin, categoryController.deleteCategory);

// produits
adminRouter.get('/dashboard/admin/products', auth, isAdmin, productController.showAllProducts);
adminRouter.get('/dashboard/admin/products/addProduct', auth, isAdmin, productController.addProductPage);
adminRouter.post('/dashboard/admin/products/addProduct', auth, isAdmin, productController.addProductAction);
adminRouter.get('/dashboard/admin/products/details/:productId', auth, isAdmin, productController.showProductDetails);
adminRouter.get('/dashboard/admin/products/details/:productId/delete', auth, isAdmin, productController.deleteProductAction);
adminRouter.get('/dashboard/admin/products/details/:productId/update', auth, isAdmin, productController.updateProductPage);
adminRouter.post('/dashboard/admin/products/details/:productId/update', auth, isAdmin, productController.updateProductAction);

// tva
adminRouter.get('/dashboard/admin/TVA', auth, isAdmin, TVAController.showAllTVA);
adminRouter.post('/dashboard/admin/TVA/addTVA', auth, isAdmin, TVAController.addTVAAction);
adminRouter.get('/dashboard/admin/TVA/updateTVA', auth, isAdmin, TVAController.updateTVAPage);
adminRouter.post('/dashboard/admin/TVA/updateTVA', auth, isAdmin, TVAController.updateTVAAction);
adminRouter.post('/dashboard/admin/TVA/deleteTVA/:categoryId', auth, isAdmin, TVAController.deleteTVA);







module.exports = adminRouter;
