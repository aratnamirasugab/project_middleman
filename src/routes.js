"use strict";

const {healthcheck} = require('./controllers/healthcheck');
const {register} = require('../src/controllers/credentials');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck);

    app.post('/api/register', register);
    
};