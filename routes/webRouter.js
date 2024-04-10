const express = require('express');
const webController = require('../controllers/webController');
const webRouter = express.Router();

webRouter.get('/', webController.getHomepage);

webRouter.get('/admin', webController.getAdminPage);

module.exports = webRouter;