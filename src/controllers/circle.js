"use strict";

const {response} = require('../context/response');
const service = require('../services/circle');

exports.createCircle = async function (req, res) {

    let DTO = req.body;
    let userDTO = req.user;

    try {

        let result = await service.createCircle(DTO, userDTO);

        return response({
            code : result.code,
            message : result.message
        }, res);
        
    } catch (error) {
        return response({
            code : 500,
            messsage : error
        }, res);
    }
}

exports.editCircleInfo = async function (req, res) {

    let DTO = req.body;
    let userDTO = req.user;

    try {

        let result = await service.editCircleInfo(DTO, userDTO);
        
        return response({
            code : result.code,
            messsage : result.message
        }, res);

    } catch (error) {
        return response({
            code : 500,
            messsage : error
        }, res);
    }
}

exports.updateCircleAvatar = async function (req, res) {

    let DTO = req.body;
    let userDTO = req.user;

    try {

        let result = await service.updateCircleAvatar(DTO, userDTO);

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