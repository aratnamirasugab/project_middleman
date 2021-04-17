"use strict";

const {response} = require('../context/response');
const service = require('../services/profile');
let {upload} = require('../middleware/multer');

exports.addPhoneNumber = async function (req, res) {
    
    let DTO = req.body;
    let userDTO = req.user;

    try {
        let result = await service.addPhoneNumber(DTO, userDTO);
        let dataToResponse = result;
        return response({
            code : dataToResponse.code,
            message : dataToResponse.message
        }, res);
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.addAddress = async function (req, res) {

    let DTO = req.body;
    let userDTO = req.user;

    try {
        let result = await service.addAddress(DTO, userDTO);
        let dataToResponse = result;

        return response({
            code : dataToResponse.code,
            message : dataToResponse.message
        }, res);
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.addProfilePicture = async function (req, res) {
    
    try {
        upload = upload.single('avatar');
        upload(req, res, async function (err) {
            if (err) {
                return response({
                    code : 500,
                    message : err
                }, res);
            }

            let rlt = await service.addProfilePicture(req.file, req.user);
            return response({
                code : rlt.code,
                message : rlt.message
            }, res);  
        })
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.getProfileInfo = async function (req, res) {

    let userDTO = req.user;

    try {

        let result = await service.getProfileInfo(userDTO);

        return response({
            code : result.code,
            message : result.message
        }, res);
        
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

