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

exports.login = async function (req, res) {
    
    let DTO = req.body;

    try {
        let login = await service.login(DTO);
        if (typeof(login.code) !== undefined && login.code === 404) {
            return response({
                code : login.code,
                message : login.message
            }, res);
        } else if (typeof(login.code) !== undefined && login.code === 403) {
            return response({
                code : login.code,
                message : login.message
            }, res);
        }
        
        let dataToResponse = login

        return response({
            "code" : 200,
            "message" : "Successfully login",
            "token" : dataToResponse.token
        }, res);
    } catch (error) {
        return response({
            "code" : 500,
            "message" : error
        }, res);
    }
}