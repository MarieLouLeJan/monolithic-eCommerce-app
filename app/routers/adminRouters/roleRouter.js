const express = require('express');
const roleRouter = express.Router();

const roleController = require('../../controllers/adminControllers/roleController');

const authObligatory = require('../../services/authObligatory');
const isAdmin = require('../../services/isAdmin');

const CW = require('../../helpers/controllerWrapper')


module.exports = roleRouter;