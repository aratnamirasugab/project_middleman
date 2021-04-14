"use strict";

const {auth} = require('./middleware/auth');
const {healthcheck} = require('./controllers/healthcheck');
const {register, login, deactived} = require('../src/controllers/credentials');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck);

    app.post('/api/register', register);
    app.post('/api/login', login);
    app.delete('/api/profile/de-actived', auth, deactived);
    
};