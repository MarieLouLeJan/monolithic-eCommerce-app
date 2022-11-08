const express = require('express');
const adressTypeRouter = express.Router();

const adressTypeController = require('../../controllers/adminControllers/adressTypeController');

const authObligatory = require('../../services/authObligatory');
const isAdmin = require('../../services/isAdmin');
const CW = require('../../helpers/controllerWrapper')


module.exports = adressTypeRouter;