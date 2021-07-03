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
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.getOrdersAsAdmin = async function(req, res) {

    const userDTO = req.user;

    try {
        let result = await service.getOrdersAsAdmin(userDTO);

        return response({
            code : result.code,
            message : result.message,
            orders : result.orders
        }, res);
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.getOrdersAsSeller = async function(req, res) {

    const userDTO = req.user;

    try {
        let result = await service.getOrdersAsSeller(userDTO);

        return response({
            code : result.code,
            message : result.message,
            orders : result.orders
        }, res);
    } catch (error) {
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.approveOrderAsSeller = async function(req, res) {

    const userDTO = req.user;
    const DTO = req.params;

    try {
        let result = await service.approveOrderAsSeller(DTO, userDTO);

        return response({
            code : result.code,
            message : result.message
        }, res);
    } catch (error) {
        console.log(error);
        return response({
            code : 500,
            message : error
        }, res);
    }
}

exports.approveOrderAsAdmin = async function(req, res) {

    const userDTO = req.user;
    const DTO = req.params;

    try {
        let result = await service.approveOrderAsAdmin(DTO, userDTO);

        return response({
            code : result.code,
            message : result.message
        }, res);
    } catch (error) {
        console.log(error);
        return response({
            code : 500,
            message : error
        }, res);
    }
}