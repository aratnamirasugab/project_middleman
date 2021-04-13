"use strict";

const {healthcheck} = require('./controllers/healthcheck');
const {register, login} = require('../src/controllers/credentials');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck);

    app.post('/api/register', register);
    app.post('/api/login', login);
    
};