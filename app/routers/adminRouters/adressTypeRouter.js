const express = require('express');
const adressTypeRouter = express.Router();

const adressTypeController = require('../../controllers/adminControllers/adressTypeController');

const authObligatory = require('../../helpers/authObligatory');
const isAdmin = require('../../helpers/isAdmin');
const CW = require('../../helpers/controllerWrapper')


module.exports = adressTypeRouter;