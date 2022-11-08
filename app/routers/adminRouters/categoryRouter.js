const express = require('express');
const categoryRouter = express.Router();

const categoryController = require('../../controllers/adminControllers/categoryController');

const authObligatory = require('../../services/authObligatory');
const isAdmin = require('../../services/isAdmin');

const CW = require('../../helpers/controllerWrapper')

categoryRouter.get('/dashboard/admin/categories', authObligatory, isAdmin, CW(categoryController.showAllCategories));

categoryRouter.post('/dashboard/admin/categories/add', authObligatory, isAdmin, CW(categoryController.addCategoriesAction));

categoryRouter.route('/dashboard/admin/categories/update')
        .get(authObligatory, isAdmin, CW(categoryController.updateCategoriesPage))
        .post(authObligatory, isAdmin, CW(categoryController.updateCategoriesAction));
categoryRouter.post('/dashboard/admin/categories/delete/:categoryId', authObligatory, isAdmin, CW(categoryController.deleteCategory));


module.exports = categoryRouter;
