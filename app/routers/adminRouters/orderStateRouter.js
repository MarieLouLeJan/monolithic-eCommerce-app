const express = require('express');
const orderStateRouter = express.Router();

const orderStateController = require('../../controllers/adminControllers/orderStateController');

const authObligatory = require('../../services/authObligatory');
const isAdmin = require('../../services/isAdmin');

const CW = require('../../helpers/controllerWrapper')


module.exports = orderStateRouter;