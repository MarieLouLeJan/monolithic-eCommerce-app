import express from 'express';
const categoryRouter = express.Router();

import controller from '../../controllers/adminControllers/categoryController.js';

import CW from '../../helpers/controllerWrapper.js';
import param from '../../helpers/paramsIsNumber.js';

import catalogAdmin from '../../services/catalogAdmin.js';
import validate from '../../services/validations/validate.js';
import { categoryChanged, categoryCreated } from '../../services/validations/schemas/category.js'

categoryRouter.get('/categories', CW(controller.showAllCategories));

categoryRouter.post('/categories/add', validate(categoryCreated, 'body'), CW(controller.addCategoriesAction));

categoryRouter.get('/categories/update', CW(controller.updateCategoriesPage))

categoryRouter.post('/categories/update/:category', param, catalogAdmin, validate(categoryChanged, 'body'), CW(controller.updateCategoriesAction));
        
categoryRouter.post('/categories/unactive/:category', param, validate(categoryChanged, 'body'), CW(controller.unactiveCategory));
categoryRouter.post('/categories/active/:category', param, validate(categoryChanged, 'body'), CW(controller.activeCategory));



export default categoryRouter;
