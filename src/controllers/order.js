"use strict";

const {response} = require('../context/response');
const service = require('../services/order');

exports.orderItem = async function(req, res) {

    const DTO = req.body;
    const userDTO = req.user;

    try {
        
        let result = await service.orderItem(DTO, userDTO);

        return response({
            code : result.code,
            message : result.message
        }, res);
    } catch (error) {
        // console.log(error)
        return response({
            code : 500,
            message : error
        }, res);
    }
}