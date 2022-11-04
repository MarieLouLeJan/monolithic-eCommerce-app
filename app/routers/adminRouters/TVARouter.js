const express = require('express');
const TVARouter = express.Router();

const TVAController = require('../../controllers/adminControllers/TVAController');

const authObligatory = require('../../helpers/authObligatory');
const isAdmin = require('../../helpers/isAdmin');
const CW = require('../../helpers/controllerWrapper')


TVARouter.get('/dashboard/admin/TVA', authObligatory, isAdmin, CW(TVAController.showAllTVA));
TVARouter.post('/dashboard/admin/TVA/add', authObligatory, isAdmin, CW(TVAController.addTVAAction));
TVARouter.post('/dashboard/admin/TVA/delete/:TVAId', authObligatory, isAdmin, CW(TVAController.deleteTVA));


module.exports = TVARouter;
