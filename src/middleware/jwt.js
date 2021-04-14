"use strict";

const jwt = require('jsonwebtoken');

exports.generateAccessToken = async function (username) {
    return jwt.sign({
        data : username   
    }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '1h'
    });
}