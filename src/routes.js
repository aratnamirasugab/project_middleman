"use strict";

const {auth} = require('./middleware/auth');
const {healthcheck} = require('./controllers/healthcheck');
const {register, login, deactived, changePassword} = require('../src/controllers/credentials');
const {addPhoneNumber, addAddress, addProfilePicture, getProfileInfo, getProfileAvatar} = require('../src/controllers/profile');
const {addItem, getAllItem, deleteItem, getItemPicture, updateItem} = require('../src/controllers/item');
const {createCircle, editCircleInfo, updateCircleAvatar, inviteNewMember, getCircleInvitation, approveCircleInvitation, removeMemberAsAdmin, quitRequestFromCircle, getQuitRequestListAsAdmin, getMemberList, postBonusScheme, getBonusScheme, getCircleInfo, getCircleAvatar, getItemOnSale} = require('../src/controllers/circle');
const {getShippingLocation, shippingFee} = require('../src/controllers/shipping');
const {orderItem} = require('../src/controllers/order');
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
    app.get('/api/profile/download/avatar/:name', auth, getProfileAvatar);
    app.get('/api/profile', auth, getProfileInfo);

    app.post('/api/item/create', auth, upload.single('item-picture'), addItem);
    app.get('/api/item/list', auth, getAllItem);
    app.get('/api/item/download/picture/:name', auth, getItemPicture);
    app.delete('/api/item/delete', auth, deleteItem);
    app.put('/api/item/edit/:id', auth, upload.single('item-picture'), updateItem);

    app.post('/api/circle/create', auth, upload.any('circle-avatar'), createCircle);
    app.put('/api/circle/edit', auth, editCircleInfo);
    app.put('/api/circle/avatar/upload', auth, upload.single('circle-avatar'), updateCircleAvatar);
    app.post('/api/circle/invite', auth, inviteNewMember);
    app.get('/api/circle/invitation', auth, getCircleInvitation);
    app.put('/api/circle/invitation/approve', auth, approveCircleInvitation);
    app.delete('/api/circle/admin/remove', auth, removeMemberAsAdmin);
    app.get('/api/circle/admin/remove_request', auth, getQuitRequestListAsAdmin);
    app.delete('/api/circle/quit', auth, quitRequestFromCircle);
    app.get('/api/circle/member_list', auth, getMemberList);
    app.post('/api/circle/bonus/edit', auth, postBonusScheme);
    app.get('/api/circle/bonus', auth, getBonusScheme);
    app.get('/api/circle', auth, getCircleInfo);
    app.get('/api/circle/download/avatar/:name', auth, getCircleAvatar);
    app.get('/api/circle/onsale', auth, getItemOnSale);

    app.get('/api/shipping/address', auth, getShippingLocation);
    app.get('/api/shipping/cost', auth, shippingFee);

    app.post('/api/order', auth, orderItem);
    app.get('/api/order/admin/orders')
    // app.get('/api/order/seller/orders')
    // app.put('/api/order/admin/approve?order_id={number}&value={boolean}')
    // app.put('/api/order/seller/approve?order_id={number}&value={boolean}')


    // payment
    
};