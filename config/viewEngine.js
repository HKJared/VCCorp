const express = require('express');

const app = express();

const configViewEngine = (app) => {
    app.use(express.static('./public'));
    app.set("view engine", "ejs");
    app.set("views", "./view");
};

module.exports = configViewEngine;