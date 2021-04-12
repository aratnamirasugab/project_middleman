"use strict";

const {healthcheck} = require('./controllers/healthcheck');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck);
};