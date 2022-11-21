import express from 'express';
const TVARouter = express.Router();

import controller from '../../controllers/adminControllers/TVAController.js';

import CW from '../../helpers/controllerWrapper.js';

import catalogAdmin from '../../services/catalogAdmin.js';

TVARouter.get('/', catalogAdmin, CW(controller.showAllTVA));
TVARouter.post('/add', CW(controller.addTVAAction));


export default TVARouter;
