const express = require('express');
const mysql = require('mysql2/promise');
const configViewEngine = require('./config/viewEngine');

const webRouter = require('./routes/webRouter');
const apiRouter = require('./routes/apiRouter');

const app = express();

const port = 3030;

app.use(webRouter);
app.use(apiRouter);


configViewEngine(app);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});