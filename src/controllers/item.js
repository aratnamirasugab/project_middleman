"use strict";

const {response} = require('../context/response');
const service = require('../services/item');
const {upload} = require('../middleware/multer');

exports.addItem = async function (req, res) {

    let DTO = req.body;
    let userDTO = req.user;

    try {

        let result = await service.addItem(DTO, userDTO);

        return response({
            code : result.code,
            message : result.message
        })
        
    } catch (error) {
        return response({
            code : 500,
            messsage : error
        })
    }
}