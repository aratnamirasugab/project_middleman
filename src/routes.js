"use strict";

const {auth} = require('./middleware/auth');
const {healthcheck} = require('./controllers/healthcheck');
const {register, login, deactived, changePassword} = require('../src/controllers/credentials');
const {addPhoneNumber, addAddress, addProfilePicture, getProfileInfo} = require('../src/controllers/profile');
const {addItem, getAllItem, deleteItem} = require('../src/controllers/item');
const {createCircle} = require('../src/controllers/circle');
let {upload} = require('./middleware/multer');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck);

    app.post('/api/register', register);
    app.post('/api/login', login);
    app.delete('/api/profile/de-actived', auth, deactived);
    app.put('/api/profile/edit/password', auth, changePassword);

    app.post('/api/profile/edit/phone_number', auth, addPhoneNumber);
    app.post('/api/profile/edit/address', auth, addAddress);
    app.post('/api/profile/upload/avatar', auth, addProfilePicture);
    app.get('/api/profile', auth, getProfileInfo);

    app.post('/api/item/create', auth, upload.any(), addItem);
    app.get('/api/item/list', auth, getAllItem);
    app.delete('/api/item/delete', auth, deleteItem);

    app.post('/api/circle/create', auth, createCircle);
    
};