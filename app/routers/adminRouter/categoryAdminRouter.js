const express = require('express');
const adminCategoryRouter = express.Router();

const categoryController = require('../../controllers/adminControllers/categoryController');


const authObligatory = require('../../validation/authObligatory');
const isAdmin = require('../../validation/isAdmin');
const CW = require('../../helpers/controllerWrapper')


adminCategoryRouter.get('/dashboard/admin/categories', authObligatory, isAdmin, CW(categoryController.showAllCategories));

adminCategoryRouter.post('/dashboard/admin/categories/addCategory', authObligatory, isAdmin, CW(categoryController.addCategoriesAction));

adminCategoryRouter.route('/dashboard/admin/categories/updateCategories')
        .get(authObligatory, isAdmin, CW(categoryController.updateCategoriesPage))
        .post(authObligatory, isAdmin, CW(categoryController.updateCategoriesAction));
        adminCategoryRouter.post('/dashboard/admin/categories/deleteCategory/:categoryId', authObligatory, isAdmin, CW(categoryController.deleteCategory));

module.exports = adminCategoryRouter;
