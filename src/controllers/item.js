"use strict";

const {response} = require('../context/response');
const service = require('../services/item');

exports.addItem = async function (req, res) {

    let DTO = req.body;
    let userDTO = req.user;

    try {

        let result = await service.addItem(DTO, userDTO);

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

exports.getAllItem = async function (req, res) {

    let userDTO = req.user;

    try {

        let result = await service.getAllItem(userDTO);

        return response({
            code : result.code,
            message : result.message,
            list_item : result.list_item
        }, res);
        
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.deleteItem = async function (req, res) {
    
    let paramDTO = req.query;

    try {
        
        let result = await service.deleteItem(paramDTO)

        return response({
            code : result.code,
            message : result.message
        }, res);

    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res)   
    }
}

exports.getItemPicture = async function (req, res) {

    const filename = req.params.name;
    const path = envs.IMAGE_PATH + "/" + "item/";

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

exports.updateItem = async function (req, res) {

    let DTO = req.body;
    DTO.id = req.params.id

    try {

        let result = await service.updateItem(DTO);

        return response({
            code : result.code,
            message : result.message
        }, res);
        
    } catch (error) {
        console.log(error);
        return response({
            code : 500,
            messsage : error
        }, res);
    }
}