const express = require('express');
const TVAAdminRouter = express.Router();


const TVAController = require('../../controllers/adminControllers/TVAController');

const authObligatory = require('../../validation/authObligatory');
const isAdmin = require('../../validation/isAdmin');
const CW = require('../../helpers/controllerWrapper')


TVAAdminRouter.get('/dashboard/admin/TVA', authObligatory, isAdmin, CW(TVAController.showAllTVA));
TVAAdminRouter.post('/dashboard/admin/TVA/addTVA', authObligatory, isAdmin, CW(TVAController.addTVAAction));
TVAAdminRouter.route('/dashboard/admin/TVA/updateTVA')
        .get(authObligatory, isAdmin, CW(TVAController.updateTVAPage))
        .post(authObligatory, isAdmin, CW(TVAController.updateTVAAction));
TVAAdminRouter.post('/dashboard/admin/TVA/deleteTVA/:TVAId', authObligatory, isAdmin, CW(TVAController.deleteTVA));


module.exports = TVAAdminRouter;
