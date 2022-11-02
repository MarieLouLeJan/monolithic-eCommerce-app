const express = require('express');
const userAdminRouter = express.Router();


const userAdminController = require('../../controllers/adminControllers/userAdminController');

const authObligatory = require('../../validation/authObligatory');
const isAdmin = require('../../validation/isAdmin');
const CW = require('../../helpers/controllerWrapper')


userAdminRouter.get('/dashboard/admin/users', authObligatory, isAdmin, CW(userAdminController.showAllUsers))
userAdminRouter.route('/dashboard/admin/users/createAdmin') 
                .get(authObligatory, isAdmin, CW(userAdminController.createAdminPage))
                .post(authObligatory, isAdmin, CW(userAdminController.createAdminAction));

module.exports = userAdminRouter;
