const express = require('express');
const bodyParser = require('body-parser');
const configViewEngine = require('./config/viewEngine');

const webRouter = require('./routes/webRouter');
const apiRouter = require('./routes/apiRouter');

const app = express();

const port = 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', webRouter);
app.use('/api', apiRouter);

configViewEngine(app);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});