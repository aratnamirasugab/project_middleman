"use strict";

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