import express from 'express';
const TVARouter = express.Router();

import TVAController from '../../controllers/adminControllers/TVAController.js';

import CW from '../../helpers/controllerWrapper.js';

import param from '../../helpers/paramsIsNumber.js';
import catalog from '../../services/catalog.js'
import catalogAdmin from '../../services/catalogAdmin.js';

TVARouter.get('/TVA', catalogAdmin, CW(TVAController.showAllTVA));
TVARouter.post('/TVA/add', CW(TVAController.addTVAAction));


export default TVARouter;
