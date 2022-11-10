import express from 'express';
const categoryRouter = express.Router();

import categoryController from '../../controllers/adminControllers/categoryController.js';

import CW from '../../helpers/controllerWrapper.js';

import param from '../../helpers/paramsIsNumber.js';
import catalogAdmin from '../../services/catalogAdmin.js'

categoryRouter.get('/categories', CW(categoryController.showAllCategories));

categoryRouter.post('/categories/add', CW(categoryController.addCategoriesAction));

categoryRouter.route('/categories/update')
        .get(CW(categoryController.updateCategoriesPage))
        .post(CW(categoryController.updateCategoriesAction));
        
categoryRouter.post('/categories/unactive/:category', param, catalogAdmin, CW(categoryController.unactiveCategory));
categoryRouter.post('/categories/active/:category', param, catalogAdmin, CW(categoryController.activeCategory));



export default categoryRouter;
