const express = require('express');
const roleRouter = express.Router();

const roleController = require('../../controllers/adminControllers/roleController');

const authObligatory = require('../../helpers/authObligatory');
const isAdmin = require('../../helpers/isAdmin');
const CW = require('../../helpers/controllerWrapper')


module.exports = roleRouter;