import express from 'express';
const TVARouter = express.Router();

import TVAController from '../../controllers/adminControllers/TVAController.js';

import authObligatory from '../../services/authObligatory.js';
import isAdmin from '../../services/isAdmin.js';

import CW from '../../helpers/controllerWrapper.js';

TVARouter.get('/dashboard/admin/TVA', authObligatory, isAdmin, CW(TVAController.showAllTVA));
TVARouter.post('/dashboard/admin/TVA/add', authObligatory, isAdmin, CW(TVAController.addTVAAction));
TVARouter.post('/dashboard/admin/TVA/delete/:TVAId', authObligatory, isAdmin, CW(TVAController.deleteTVA));

export default TVARouter;
