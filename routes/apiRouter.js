const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();

apiRouter.delete('/row', apiController.deleteRow)

apiRouter.get('/rows', apiController.getRows)

module.exports = apiRouter;