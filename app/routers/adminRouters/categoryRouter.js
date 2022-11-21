import express from 'express';
const categoryRouter = express.Router();

import controller from '../../controllers/adminControllers/categoryController.js';

import CW from '../../helpers/controllerWrapper.js';
import param from '../../helpers/paramsIsNumber.js';

import catalogAdmin from '../../services/catalogAdmin.js';
import validate from '../../services/validations/validate.js';
import { categoryChanged, categoryCreated } from '../../services/validations/schemas/category.js'

categoryRouter.get('/', CW(controller.showAllCategories));

categoryRouter.post('/add', validate(categoryCreated, 'body'), CW(controller.addCategoriesAction));

categoryRouter.get('/update', CW(controller.updateCategoriesPage))

categoryRouter.post('/update/:category', param, catalogAdmin, validate(categoryChanged, 'body'), CW(controller.updateCategoriesAction));
        
categoryRouter.post('/unactive/:category', param, validate(categoryChanged, 'body'), CW(controller.unactiveCategory));
categoryRouter.post('/active/:category', param, validate(categoryChanged, 'body'), CW(controller.activeCategory));



export default categoryRouter;
