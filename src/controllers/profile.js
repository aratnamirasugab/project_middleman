"use strict";

const envs = require('../../config');
const {response} = require('../context/response');
const service = require('../services/profile');

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
        let dataToResponse = await service.addProfilePicture(req.file, req.user);

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

exports.getProfileAvatar = async function (req, res) {

    const filename = req.params.name;
    const path = envs.IMAGE_PATH + "/" + "profile/";

    try {
        res.download(path + filename, (err) => {
            if (err) {
                return response({
                    code : 500,
                    message : "File cannot be downloaded " + err
                }, res);
            }
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
            user_data : result.user_data
        }, res);
        
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

