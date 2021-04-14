"use strict";

const {response} = require('../context/response');
const jwt = require('jsonwebtoken');

exports.auth = function (req, res, next) {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return response({
            code : 401,
            message : "You're not authorized"
        }, res);
    }

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, result) => {
        if (error) {
            return response({
                code : 403,
                message : "You're not authorized"
            }, res);
        }

        req.user = result;
        next();
    })
}