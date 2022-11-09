import express from 'express';
const categoryRouter = express.Router();

import categoryController from '../../controllers/adminControllers/categoryController.js';

import CW from '../../helpers/controllerWrapper.js';

import param from '../../helpers/paramsIsNumber.js';
import catalog from '../../services/catalog.js'

categoryRouter.get('/categories', CW(categoryController.showAllCategories));

categoryRouter.post('/categories/add', CW(categoryController.addCategoriesAction));

categoryRouter.route('/categories/update')
        .get(CW(categoryController.updateCategoriesPage))
        .post(CW(categoryController.updateCategoriesAction));
        
categoryRouter.post('/categories/delete/:category', param, catalog, CW(categoryController.unactiveCategory));


export default categoryRouter;
