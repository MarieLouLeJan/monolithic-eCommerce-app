const express = require('express');
const orderStateRouter = express.Router();

const orderStateController = require('../../controllers/adminControllers/orderStateController');

const authObligatory = require('../../helpers/authObligatory');
const isAdmin = require('../../helpers/isAdmin');
const CW = require('../../helpers/controllerWrapper')


module.exports = orderStateRouter;