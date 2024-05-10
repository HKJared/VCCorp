const express = require('express');
const apiController = require('../controllers/apiController');
const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');
const apiRouter = express.Router();

//login logout
apiRouter.post('/login', apiController.login);
apiRouter.post('/logout', apiController.logout);

apiRouter.post('/register', apiController.register);

apiRouter.get('/authentication', apiController.authentication);

// quản lí sheet
apiRouter.post('/row', (req, res, next) => {
    authorize(req, res, 'create', next);
}, apiController.createRow);
apiRouter.get('/row', authenticate, apiController.getRow);
apiRouter.get('/rows-style', authenticate, apiController.getRowsStyle);
apiRouter.put('/row', (req, res, next) => {
    authorize(req, res, 'update', next);
}, apiController.updateRow);
apiRouter.delete('/row', (req, res, next) => {
    authorize(req, res, 'delete', next);
}, apiController.deleteRow);


// quản lí style
apiRouter.get('/style', authenticate, apiController.getStyle);


//quản lí website
apiRouter.get('/websites', authenticate, apiController.getWebsites);

module.exports = apiRouter;