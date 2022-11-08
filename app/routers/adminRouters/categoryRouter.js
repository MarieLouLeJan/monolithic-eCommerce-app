import express from 'express';
const categoryRouter = express.Router();

import categoryController from '../../controllers/adminControllers/categoryController.js';

import authObligatory from '../../services/authObligatory.js';
import isAdmin from '../../services/isAdmin.js';

import CW from '../../helpers/controllerWrapper.js';

categoryRouter.get('/dashboard/admin/categories', authObligatory, isAdmin, CW(categoryController.showAllCategories));

categoryRouter.post('/dashboard/admin/categories/add', authObligatory, isAdmin, CW(categoryController.addCategoriesAction));

categoryRouter.route('/dashboard/admin/categories/update')
        .get(authObligatory, isAdmin, CW(categoryController.updateCategoriesPage))
        .post(authObligatory, isAdmin, CW(categoryController.updateCategoriesAction));
categoryRouter.post('/dashboard/admin/categories/delete/:categoryId', authObligatory, isAdmin, CW(categoryController.unactiveCategory));


export default categoryRouter;
