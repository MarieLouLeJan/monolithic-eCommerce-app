const { Router } = require('express');
const express = require('express');
const adminRouter = express.Router();

const categoryController = require('../controllers/adminControllers/categoryController');
const productController = require('../controllers/adminControllers/productController');
const TVAController = require('../controllers/adminControllers/TVAController');
const userAdminController = require('../controllers/adminControllers/userAdminController');

const authObligatory = require('../middlewares/authObligatory');
const isAdmin = require('../middlewares/isAdmin');
const CW = require('../helpers/controllerWrapper')


// categories
adminRouter.get('/dashboard/admin/categories', authObligatory, isAdmin, CW(categoryController.showAllCategories));
adminRouter.post('/dashboard/admin/categories/addCategory', authObligatory, isAdmin, CW(categoryController.addCategoriesAction));
adminRouter.route('/dashboard/admin/categories/updateCategories')
        .get(authObligatory, isAdmin, CW(categoryController.updateCategoriesPage))
        .post(authObligatory, isAdmin, CW(categoryController.updateCategoriesAction));
adminRouter.post('/dashboard/admin/categories/deleteCategory/:categoryId', authObligatory, isAdmin, CW(categoryController.deleteCategory));

// produits
adminRouter.get('/dashboard/admin/products', authObligatory, isAdmin, CW(productController.showAllProducts));
adminRouter.route('/dashboard/admin/products/addProduct')
        .get(authObligatory, isAdmin, productController.addProductPage)
        .post(authObligatory, isAdmin, productController.addProductAction);
adminRouter.get('/dashboard/admin/products/details/:productId', authObligatory, isAdmin, CW(productController.showProductDetails));
adminRouter.get('/dashboard/admin/products/details/:productId/delete', authObligatory, isAdmin, CW(productController.deleteProductAction));
adminRouter.route('/dashboard/admin/products/details/:productId/update')
        .get(authObligatory, isAdmin, CW(productController.deleteProductAction))
        .post(authObligatory, isAdmin, CW(productController.updateProductAction));

// tva
adminRouter.get('/dashboard/admin/TVA', authObligatory, isAdmin, CW(TVAController.showAllTVA));
adminRouter.post('/dashboard/admin/TVA/addTVA', authObligatory, isAdmin, CW(TVAController.addTVAAction));
adminRouter.route('/dashboard/admin/TVA/updateTVA')
        .get(authObligatory, isAdmin, CW(TVAController.updateTVAPage))
        .post(authObligatory, isAdmin, CW(TVAController.updateTVAAction));
adminRouter.post('/dashboard/admin/TVA/deleteTVA/:TVAId', authObligatory, isAdmin, CW(TVAController.deleteTVA));

// user

adminRouter.get('/dashboard/admin/users', authObligatory, isAdmin, CW(userAdminController.showAllUsers))
adminRouter.route('/dashboard/admin/users/createAdmin') 
                .get(authObligatory, isAdmin, CW(userAdminController.createAdminPage))
                .post(authObligatory, isAdmin, CW(userAdminController.createAdminAction));

module.exports = adminRouter;
