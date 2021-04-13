"use strict";

const service = require('../services/credentials');
const response = require('../context/response');

exports.register = async function (req, res) {

    let DTO = req.body;

    try {
        let register = await service.register(DTO);
        return response.ok("Successfully registered", res);
    } catch (error) {
        return response.internal_server_error(error, res);
    }
}