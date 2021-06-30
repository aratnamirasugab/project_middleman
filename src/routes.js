"use strict";

const {auth} = require('./middleware/auth');
const {healthcheck} = require('./controllers/healthcheck');
const {register, login, deactived, changePassword} = require('../src/controllers/credentials');
const {addPhoneNumber, addAddress, addProfilePicture, getProfileInfo} = require('../src/controllers/profile');
const {addItem, getAllItem, deleteItem} = require('../src/controllers/item');
const {createCircle, editCircleInfo, updateCircleAvatar, inviteNewMember, getCircleInvitation, approveCircleInvitation, removeMemberAsAdmin, quitRequestFromCircle, getQuitRequestListAsAdmin, getMemberList, postBonusScheme, getBonusScheme} = require('../src/controllers/circle');
let {upload} = require('./middleware/multer');

module.exports = function (app) {
    app.get('/api/healthcheck', healthcheck);

    app.post('/api/register', register);
    app.post('/api/login', login);
    app.delete('/api/profile/de-actived', auth, deactived);
    app.put('/api/profile/edit/password', auth, changePassword);

    app.post('/api/profile/edit/phone_number', auth, addPhoneNumber);
    app.post('/api/profile/edit/address', auth, addAddress);
    app.post('/api/profile/upload/avatar', auth, upload.single('avatar'), addProfilePicture);
    app.get('/api/profile', auth, getProfileInfo);

    app.post('/api/item/create', auth, upload.any(), addItem);
    app.get('/api/item/list', auth, getAllItem);
    app.delete('/api/item/delete', auth, deleteItem);

    app.post('/api/circle/create', auth, upload.any(), createCircle);
    app.put('/api/circle/edit', auth, editCircleInfo);
    app.put('/api/circle/avatar/upload', auth, upload.single('circle_avatar'), updateCircleAvatar);
    app.post('/api/circle/invite', auth, inviteNewMember);
    app.get('/api/circle/invitation', auth, getCircleInvitation);
    app.put('/api/circle/invitation/approve', auth, approveCircleInvitation);
    app.delete('/api/circle/admin/remove', auth, removeMemberAsAdmin);
    app.get('/api/circle/admin/remove_request', auth, getQuitRequestListAsAdmin);
    app.delete('/api/circle/quit', auth, quitRequestFromCircle);
    app.get('/api/circle/member_list', auth, getMemberList);
    app.post('/api/circle/bonus/edit', auth, postBonusScheme);
    app.get('/api/circle/bonus', auth, getBonusScheme);

    
};