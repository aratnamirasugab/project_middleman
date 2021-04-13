"use strict";

const service = require('../services/credentials');
const {response} = require('../context/response');

exports.register = async function (req, res) {

    let DTO = req.body;

    try {
        let register = await service.register(DTO);
        if (register.code === 400 && typeof(register.code) !== undefined) {
            return response(register, res);
        }

        let dataToResponse = register;
        return response(dataToResponse, res);
    } catch (error) {
        return response({
            "code" : 500,
            "message" : error
        }, res);
    }
}