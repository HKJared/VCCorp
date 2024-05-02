const express = require('express');
const webController = require('../controllers/webController');
const webRouter = express.Router();

webRouter.get('/', webController.getHomepage);

webRouter.get('/admin', webController.getAdminPage);
webRouter.get('/price-list', webController.getPriceListAdminPage);
webRouter.get('/website-list', webController.getWebsiteListAdminPage);

module.exports = webRouter;