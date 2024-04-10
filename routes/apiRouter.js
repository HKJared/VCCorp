const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();

apiRouter.delete('/delete-row', apiController.deleteRow)

module.exports = apiRouter;