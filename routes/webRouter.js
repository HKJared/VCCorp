const express = require('express');
const webController = require('../controllers/webController');
const webRouter = express.Router();

webRouter.get('/', webController.getHomepage);

webRouter.get('/login-register', webController.getLoginPage);


webRouter.get('/admin', webController.getAdminPage);
webRouter.get('/price-list', webController.getPriceListAdminPage);
webRouter.get('/website-list', webController.getWebsiteListAdminPage);
webRouter.get('/account-list', webController.getAccountListAdminPage);

module.exports = webRouter;