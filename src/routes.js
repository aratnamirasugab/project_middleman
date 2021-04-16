"use strict";

const {auth} = require('./middleware/auth');
const {upload} = require('./middleware/multer');
const {healthcheck} = require('./controllers/healthcheck');
const {register, login, deactived, changePassword} = require('../src/controllers/credentials');
const {addPhoneNumber, addAddress, addProfilePicture} = require('../src/controllers/profile');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck);

    app.post('/api/register', register);
    app.post('/api/login', login);
    app.delete('/api/profile/de-actived', auth, deactived);
    app.put('/api/profile/edit/password', auth, changePassword);

    app.post('/api/profile/edit/phone_number', auth, addPhoneNumber);
    app.post('/api/profile/edit/address', auth, addAddress);
    app.post('/api/profile/upload/avatar', auth, upload.single("avatar"), addProfilePicture);
    
};