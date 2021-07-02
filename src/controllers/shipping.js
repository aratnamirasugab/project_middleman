"use strict";

const {response} = require('../context/response');
const service = require('../services/shipping');

exports.getShippingLocation = async function (req, res) {

    try {

        let result = await service.getShippingLocation();

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

exports.shippingFee = async function(req, res) {

    const DTO = req.body;
    // available courier : jne, pos, tiki

    try {
        let cost = await service.shippingFee(DTO)
        return response({
            code : 200,
            message : cost
        }, res);
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}