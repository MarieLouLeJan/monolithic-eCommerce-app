import express from 'express';
const TVARouter = express.Router();

import TVAController from '../../controllers/adminControllers/TVAController.js';

import CW from '../../helpers/controllerWrapper.js';

import param from '../../helpers/paramsIsNumber.js';
import catalog from '../../services/catalog.js'

TVARouter.get('/dashboard/admin/TVA', CW(TVAController.showAllTVA));
TVARouter.post('/dashboard/admin/TVA/add', CW(TVAController.addTVAAction));
TVARouter.post('/dashboard/admin/TVA/delete/:TVA', param, catalog, CW(TVAController.unactiveTVA));

export default TVARouter;
