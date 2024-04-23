const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();

apiRouter.post('/row', apiController.createRow);
apiRouter.get('/row', apiController.getRow);
apiRouter.put('/row', apiController.updateRow);
apiRouter.delete('/row', apiController.deleteRow);

apiRouter.get('/style', apiController.getStyle);

apiRouter.get('/rows-style', apiController.getRowsStyle)

module.exports = apiRouter;