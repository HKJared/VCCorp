const express = require('express');
const webController = require('../controllers/webController');
const webRouter = express.Router();

webRouter.get('/', webController.getHomepage)

module.exports = webRouter;