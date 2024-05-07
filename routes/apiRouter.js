const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();

//login logout

apiRouter.post('/login', apiController.login);

apiRouter.post('/register', apiController.register);

apiRouter.get('/authentication', apiController.authentication);

// 

apiRouter.post('/row', apiController.createRow);
apiRouter.get('/row', apiController.getRow);
apiRouter.get('/rows-style', apiController.getRowsStyle);
apiRouter.put('/row', apiController.updateRow);
apiRouter.delete('/row', apiController.deleteRow);

apiRouter.get('/style', apiController.getStyle);

apiRouter.get('/websites', apiController.getWebsites);

module.exports = apiRouter;